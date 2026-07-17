// src/hooks/useGameState.ts
import { useState, useEffect } from 'react';
import type { Card, Leader, TurnActionLog, GameInitResponse, Crest } from '../../../shared/types';
import type { GameContext } from '../../../shared/game';
import { executeGameEffect } from '../effects';
import { conditionCheck } from '../conditions';
import type { TargetingContext } from '../effects/selectTarget';
import type { CardCondition } from '../conditions';

import { cloneCards, shuffle, assignInstanceIds, cloneCrest } from '../game/utils/cardUtils';
import { executeEndTurn } from '../game/actions/endTurn';
import { executeAttackToFollower } from '../game/actions/attackToFollower';
import { executeCardPlay } from '../game/actions/playCard';
import { mergeGameEffectResult } from '../game/utils/gameUtils';
import { executeDrawCard } from '../game/actions/drawCard';
import { executeApplyEvolution } from '../game/actions/applyEvolution';
import { executeAttackToLeader } from '../game/actions/attackToLeader';
import { executeEnemyPlayCard } from '../game/actions/enemyAI';
import { executeMulligan } from '../game/actions/mulligan';
import { executePlayAct } from '../game/actions/playAct';



export function useGameState() {
  const [hand, setHand] = useState<Card[]>([]);
  const [field, setField] = useState<Card[]>([]);
  const [enemyField, setEnemyField] = useState<Card[]>([]);
  const [deck, setDeck] = useState<Card[]>([]);
  const [token, setToken] = useState<Card[]>([]);
  const [crest, setCrest] = useState<Crest[]>([]);
  
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
  const [actSelectTriggereId, setActSelectTriggerId] = useState<string | null>(null);
  
  const [turnLog, setTurnLog] = useState<TurnActionLog>({
    cardPlayed: [],
    followersSummoned: 0,
    spellsCast: 0,
    amuletsPlaced: 0,
    oneTurnPlayCount: 0,
  });

  const [myCrest, setMyCrest] = useState<Crest[]>([]);
  const [enemyCrest, setEnemyCrest] = useState<Crest[]>([]);

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
    crest: cloneCrest(crest),
    myCrest: cloneCrest(myCrest),
    enemyCrest: cloneCrest(enemyCrest),
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
    setCrest(ctx.crest);
    setMyCrest(ctx.myCrest);
    setEnemyCrest(ctx.enemyCrest);
  };

  const executeAction = (action: (ctx: GameContext) => void) => {
    const ctx = createCurrentContext();
    action(ctx);
    reflectContext(ctx);
  };

  const drawCardCtx = (ctx: GameContext) => {
    executeDrawCard(ctx, () => alert("バトルに敗北しました。"));
  };

  const handleMulliganConfirm = (selectCards: Card[]) => {
    executeAction(ctx => {
      executeMulligan(ctx, selectCards, () => alert("バトルに敗北しました。"));
    });
    
    setIsMulligan(false);
  };

  const endTurn = () => {
    executeAction(ctx => {
      executeEndTurn(ctx, drawCardCtx, mergeGameEffectResult);
    });
  };

  const attackToLeader = (targetInstanceId: string) => {
    executeAction(ctx => {
      executeAttackToLeader(ctx, targetInstanceId, {
        onInvalidAttack: (msg) => alert(msg),
        onVictory: (msg) => alert(msg)
      });
    });

    setSelectedMyCardId(null);
  };

  const playAct = (targetCard: Card) => {
    executeAction(ctx => {
      executePlayAct(ctx, targetCard, null, {
        executeGameEffect,
        mergeGameEffectResult,
        setTargetingContext
      });


      const ActAbility = targetCard.abilities.find(
        a => a.trigger === 'Act' && ['SelectDamage', 'SelectDestroy', 'SelectStatsFix', 'SelectBounce'].includes(a.effectType ?? '')
      );

      if (ActAbility) {
        const isBounce = ActAbility.effectType === 'SelectBounce';
        const hasValidTarget = isBounce ? ctx.field.length >= 1 : ctx.enemyField.length >= 1;
        
        
        if (hasValidTarget) {
          setActSelectTriggerId(targetCard.instanceId!);
          setTargetingContext({
            card: targetCard,
            effectType: ActAbility.effectType as any,
            values: ActAbility.values ?? {},
            targetTeam: isBounce ? 'my' : 'enemy'
          });
          return;
        }
      }
    });
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
      executeApplyEvolution(ctx, targetInstanceId);
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
    executeAction(ctx => {
      executeEnemyPlayCard(ctx);
    });
  };

  const selectTargetCard = (targetIndex: number) => {
    if (!targetingContext) return;

    executeAction(ctx => {
      if (evoledSelectTargetId === null && actSelectTriggereId === null) {
        executeCardPlay(ctx, targetingContext.card, targetIndex, {
          conditionCheck,
          executeGameEffect,
          mergeGameEffectResult,
          setTargetingContext
        });
      } else if (actSelectTriggereId === null) {
        const result = executeGameEffect(targetingContext.effectType, targetingContext.values, ctx, targetIndex);
        mergeGameEffectResult(ctx, result);
        setActSelectTriggerId(null);
      } else {
        const result = executeGameEffect(targetingContext.effectType, targetingContext.values, ctx, targetIndex);
        mergeGameEffectResult(ctx, result);
        
        executeApplyEvolution(ctx, evoledSelectTargetId);
        
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
        setCrest(data.crest);
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
    myCrest,
    enemyCrest,
    isMulligan,
    enemyField,
    selectedMyCardId,
    targetingContext,
    selectTargetCard,
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
    playAct,
  };
}