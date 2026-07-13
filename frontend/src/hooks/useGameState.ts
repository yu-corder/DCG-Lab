// src/hooks/useGameState.ts
import { useState, useEffect } from 'react';
import type { Card, Leader, TurnActionLog, GameInitResponse } from '../../../shared/types';
import type { GameContext } from '../../../shared/game';
import { executeGameEffect } from '../effects';
import { conditionCheck } from '../conditions';
import type { TargetingContext } from '../effects/selectTarget';
import type { CardCondition } from '../conditions';
import { cloneCards } from '../game/utils/cardUtils';

import { executeEndTurn } from '../game/actions/endTurn';
import { executeAttackToFollower } from '../game/actions/attackToFollower';
import { executeCardPlay } from '../game/actions/playCard';
import { mergeGameEffectResult } from '../game/utils/gameUtils';
import { executeDrawCard } from '../game/actions/drawCard';

export function useGameState() {
  const [hand, setHand] = useState<Card[]>([]);
  const [field, setField] = useState<Card[]>([]);
  const [enemyField, setEnemyField] = useState<Card[]>([]);
  const [deck, setDeck] = useState<Card[]>([]);
  const [token, setToken] = useState<Card[]>([]);
  
  const [pp, setPP] = useState(1);
  const [maxPP, setMaxPP] = useState(1);
  const [myHealth, setMyHealth] = useState(20);
  const [enemyHealth, setEnemyHealth] = useState(20);
  const [turn, setTurn] = useState(1);
  
  const [myEp, setMyEP] = useState(2);
  const [enemyEp, setEnemyEP] = useState(2);
  const [myExEp, setMyExEp] = useState(2);
  const [enemyExEp, setEnemyExEP] = useState(2);
  const [hasEvolvedThisTurn, setHasEvolvedThisTurn] = useState(false);
  
  const [myLeader, setMyLeader] = useState<Leader>();
  const [enemyLeader, setEnemyLeader] = useState<Leader>();
  const [isMulligan, setIsMulligan] = useState(true);
  
  const [selectedMyCardId, setSelectedMyCardId] = useState<string | null>(null);
  const [targetingContext, setTargetingContext] = useState<TargetingContext | null>(null);
  const [evoledSelectTargetId, setEvoledSelectTargetId] = useState<string | null>(null);
  
  const [turnLog, setTurnLog] = useState<TurnActionLog>({
    cardPlayed: [],
    followersSummoned: 0,
    spellsCast: 0,
    amuletsPlaced: 0,
    oneTurnPlayCount: 0,
  });

  const createCurrentContext = (): GameContext => ({
    field: cloneCards(field),
    enemyField: cloneCards(enemyField),
    hand: cloneCards(hand),
    deck: cloneCards(deck),
    token: cloneCards(token),
    myHealth,
    enemyHealth,
    maxPP,
    pp,
    myEp,
    enemyEp,
    myExEp,
    enemyExEp,
    hasEvolvedThisTurn,
    turn,
    turnLog: JSON.parse(JSON.stringify(turnLog)), 
  });

  const reflectContext = (ctx: GameContext) => {
    setField(ctx.field);
    setEnemyField(ctx.enemyField);
    setHand(ctx.hand);
    setDeck(ctx.deck);
    setToken(ctx.token);
    setMyHealth(ctx.myHealth);
    setEnemyHealth(ctx.enemyHealth);
    setMaxPP(ctx.maxPP);
    setPP(ctx.pp);
    setMyEP(ctx.myEp);
    setEnemyEP(ctx.enemyEp);
    setMyExEp(ctx.myExEp);
    setEnemyExEP(ctx.enemyExEp);
    setHasEvolvedThisTurn(ctx.hasEvolvedThisTurn);
    setTurn(ctx.turn);
    setTurnLog(ctx.turnLog);
  };

  const executeAction = (action: (ctx: GameContext) => void) => {
    const ctx = createCurrentContext();
    action(ctx);
    reflectContext(ctx);
  };

  function shuffle<T>(array: T[]) {
    const out = Array.from(array);
    for (let i = out.length - 1; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      const tmp = out[i];
      out[i] = out[r];
      out[r] = tmp;
    }
    return out;
  }

  const assignInstanceIds = (cards: Card[]): Card[] => {
    return cards.map(card => ({
      ...card,
      instanceId: card.instanceId || crypto.randomUUID()
    }));
  };

  const drawCardCtx = (ctx: GameContext) => {
    executeDrawCard(ctx, () => alert("バトルに敗北しました。"));
  };

  const handleMulliganConfirm = (selectCards: Card[]) => {
    const ctx = createCurrentContext();
    const count = selectCards.length;
    const newDrawnCards = ctx.deck.slice(0, count);
    const remainingDeck = ctx.deck.slice(count);

    ctx.hand = ctx.hand
      .filter(h => !selectCards.some(s => s.instanceId === h.instanceId))
      .concat(newDrawnCards);

    ctx.deck = shuffle([...remainingDeck, ...selectCards]);
    setIsMulligan(false);

    drawCardCtx(ctx);
    reflectContext(ctx);
  };

  const endTurn = () => {
    executeAction(ctx => {
      executeEndTurn(ctx, drawCardCtx, mergeGameEffectResult);
    });
  };

  const attackToLeader = (targetInstanceId: string) => {
    let ctx = createCurrentContext();
    const targetCard = ctx.field.find(f => f.instanceId === targetInstanceId);
    if (!targetCard) return;

    const hasStorm = targetCard.abilities.some(a => a.abilityType === 'SHISSOU');
    if (targetCard.playedThisTurn && !hasStorm) {
      alert("このフォロワーは、場に出たターンにはリーダーを攻撃できません。");
      return;
    }

    if (targetCard.hasAttacked) {
      alert("このフォロワーはもう攻撃できません。");
      return;
    }

    if (ctx.enemyHealth - targetCard.attack <= 0) {
      ctx.enemyHealth -= (targetCard.attack || 0);
      reflectContext(ctx);
      alert("バトルに勝利しました。");
      return;
    }

    ctx.enemyHealth -= (targetCard.attack || 0);
    ctx.field = ctx.field.map(card => 
      card.instanceId === targetInstanceId ? { ...card, hasAttacked: true } : card
    );

    setSelectedMyCardId(null);
    reflectContext(ctx);
  };

  const applyEvolution = (ctx: GameContext, targetInstanceId: string) => {
    ctx.myEp -= 1;
    ctx.hasEvolvedThisTurn = true;
    ctx.field = ctx.field.map(card => 
      card.instanceId === targetInstanceId ? {
        ...card,
        attack: card.attack + 2,
        defense: card.defense + 2,
        isEvolved: true,
        hasAttacked: false,
      } : card
    );
  };

  const executeEvolveFollower = (ctx: GameContext, targetInstanceId: string) => {
    const targetCard = ctx.field.find(f => f.instanceId === targetInstanceId);
    if (!targetCard) return;

    if (ctx.turn < 4) return alert("進化可能ターンではありません。");
    if (ctx.myEp <= 0) return alert("EPが足りません。");
    if (ctx.hasEvolvedThisTurn) return alert("1ターンに進化できるのは1度だけです。");
    if (targetCard.isEvolved) return alert("すでに進化済みのフォロワーです。");

    let applyChk = false;
    
    targetCard.abilities.forEach(ability => {
      if (ability.trigger !== 'Evolve') return;
      
      const conditionObj = {
        type: ability.conditionType, 
        subType: ability.triggerConditions, 
        value: ability.conditionValue ?? null
      } as CardCondition;
      
      let isConditionMet = true;
      if (ability.conditionType && ability.triggerConditions) {
        const resultObj = conditionCheck(ctx, conditionObj);
        isConditionMet = resultObj.condition;
      }

      if (!isConditionMet) return;

      const isSelectEffect = ['SelectDamage', 'SelectDestroy', 'SelectStatsFix', 'SelectBounce'].includes(ability.effectType ?? '');

      if (!isSelectEffect) {
        const result = executeGameEffect(ability.effectType ?? '', ability.values ?? {}, ctx);
        mergeGameEffectResult(ctx, result);
      } else {
        const isBounce = ability.effectType === 'SelectBounce';
        const hasValidTarget = isBounce ? ctx.field.length >= 1 : ctx.enemyField.length >= 1;

        if (hasValidTarget) {
          setTargetingContext({
            card: targetCard,
            effectType: ability.effectType as any,
            values: ability.values ?? {},
            targetTeam: isBounce ? 'my' : 'enemy'
          });
          setEvoledSelectTargetId(targetInstanceId);
          applyChk = true;
        }
      }
    });

    if (!applyChk) {
      applyEvolution(ctx, targetInstanceId);
    }
  };

  const evolveFollower = (targetId: string) => {
    executeAction(ctx => {
      executeEvolveFollower(ctx, targetId);
    });
  };

  const executeExEvolveFollower = (ctx: GameContext, targetInstanceId: string) => {
    const targetCard = ctx.field.find(f => f.instanceId === targetInstanceId);
    if (!targetCard) return;

    if (ctx.turn < 6) {
      alert("超進化可能ターンではありません。");
      return;
    }
    if (ctx.myExEp <= 0) {
      alert("EXEPが足りません。");
      return;
    }
    if (ctx.hasEvolvedThisTurn) {
      alert("1ターンに進化できるのは1度だけです。");
      return;
    }
    if (targetCard.isEvolved) {
      alert("すでに進化済みのフォロワーです。");
      return;
    }

    ctx.myExEp -= 1;
    ctx.hasEvolvedThisTurn = true;

    ctx.field = ctx.field.map(card => 
      card.instanceId === targetInstanceId ? {
        ...card,
        attack: card.attack + 3,
        defense: card.defense + 3,
        isEvolved: true,
        hasAttacked: false,
        isExEvolved: true,
      } : card
    );
  };

  const exEvolveFollower = (targetInstanceId: string) => {
    executeAction(ctx => {
      executeExEvolveFollower(ctx, targetInstanceId);
    });
  };

  const attackToFollower = (myInstanceId: string, enemyInstanceId: string) => {
    executeAction(ctx => {
      executeAttackToFollower(ctx, myInstanceId, enemyInstanceId, mergeGameEffectResult);
    });
    setSelectedMyCardId(null);
  };

  const enemyPlayCard = () => {
    let ctx = createCurrentContext();
    let enemyCard: Card | null = null;
    for (let i = 0; i < ctx.deck.length; i++) {
      if (ctx.deck[i].type === 'Follower') {
        enemyCard = ctx.deck[i];
        break;
      }
    }
    if (!enemyCard || ctx.enemyField.length >= 5) return;
    const enemyCardWithId = enemyCard.instanceId ? enemyCard : { ...enemyCard, instanceId: crypto.randomUUID() };
    
    ctx.enemyField = [...ctx.enemyField, enemyCardWithId];
    reflectContext(ctx);
  };

  const selectTargetFollower = (targetIndex: number) => {
    if (!targetingContext) return;

    executeAction(ctx => {
      if (evoledSelectTargetId === null) {
        executeCardPlay(ctx, targetingContext.card, targetIndex, {
          conditionCheck,
          executeGameEffect,
          mergeGameEffectResult,
          setTargetingContext
        });
      } else {
        const result = executeGameEffect(targetingContext.effectType, targetingContext.values, ctx, targetIndex);
        mergeGameEffectResult(ctx, result);
        
        ctx.myEp -= 1;
        ctx.hasEvolvedThisTurn = true;
        ctx.field = ctx.field.map(card => 
          card.instanceId === evoledSelectTargetId ? {
            ...card,
            attack: card.attack + 2,
            defense: card.defense + 2,
            isEvolved: true,
            hasAttacked: false,
          } : card
        );
        
        setEvoledSelectTargetId(null);
      }
    });
    
    setTargetingContext(null);
  };

  const cancelTargeting = () => {
    setTargetingContext(null);
    setEvoledSelectTargetId(null);
  };

  const playCard = (targetCard: Card) => {
    const tempCtx = createCurrentContext();

    if (tempCtx.pp < targetCard.cost) {
      alert("ppが足りません。");
      return;
    }
    if (tempCtx.field.length >= 5 && (targetCard.type === 'Follower' || targetCard.type === 'Amulet')) return;

    const fanfareAbility = targetCard.abilities.find(
      a => a.trigger === 'Fanfare' && ['SelectDamage', 'SelectDestroy', 'SelectStatsFix', 'SelectBounce'].includes(a.effectType ?? '')
    );

    if (fanfareAbility) {
      let isConditionMet = true;
      if (fanfareAbility.conditionType && fanfareAbility.triggerConditions) {
        const conditionObj = {
          type: fanfareAbility.conditionType,
          subType: fanfareAbility.triggerConditions,
          value: fanfareAbility.conditionValue ?? null
        } as CardCondition;

        const virtualTurnLog = {
          ...tempCtx.turnLog,
          oneTurnPlayCount: tempCtx.turnLog.oneTurnPlayCount + 1
        };

        let virtualField = cloneCards(tempCtx.field);
        if (targetCard.type === 'Follower' || targetCard.type === 'Amulet') {
          virtualField.push({
            ...targetCard,
            playedThisTurn: true
          });
        }

        const resultObj = conditionCheck(
          { ...tempCtx, field: virtualField, turnLog: virtualTurnLog }, 
          conditionObj
        );
        isConditionMet = resultObj.condition;
      }

      const isBounce = fanfareAbility.effectType === 'SelectBounce';
      const hasValidTarget = isBounce ? tempCtx.field.length >= 1 : tempCtx.enemyField.length >= 1;
      
      if (!hasValidTarget && targetCard.type === 'Spell') {
        return;
      }
      
      if (isConditionMet && hasValidTarget) {
        setTargetingContext({
          card: targetCard,
          effectType: fanfareAbility.effectType as any,
          values: fanfareAbility.values ?? {},
          targetTeam: isBounce ? 'my' : 'enemy'
        });
        return;
      }
    }

    executeAction(ctx => {
      executeCardPlay(ctx, targetCard, null, {
        conditionCheck,
        executeGameEffect,
        mergeGameEffectResult,
        setTargetingContext
      });
    });
  };

  const damageMyLeader = (amount: number) => {
    setMyHealth(prev => Math.max(0, prev - amount));
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/game-start')
      .then(res => res.json())
      .then((data: GameInitResponse) => {
        const cardsWithId = assignInstanceIds(data.cards);
        const shuffled = shuffle(cardsWithId);
        const initialHand = shuffled.slice(0, 4);
        const remainingDeck = shuffled.slice(4);

        setHand(initialHand);
        setDeck(remainingDeck);
        setMyLeader(data.myLeader);
        setEnemyLeader(data.enemyLeader);
        setToken(data.token);
      });
  }, []);

  return {
    deck,
    hand,
    field,
    pp,
    enemyHealth,
    myHealth,
    maxPP,
    turn,
    myEp,
    myExEp,
    isMulligan,
    enemyField,
    selectedMyCardId,
    targetingContext,
    selectTargetFollower,
    setSelectedMyCardId,
    handleMulliganConfirm,
    endTurn,
    attackToLeader,
    evolveFollower,
    exEvolveFollower,
    attackToFollower,
    enemyPlayCard,
    playCard,
    cancelTargeting,
    damageMyLeader,
  };
}