// src/hooks/useGameState.ts
import { useState, useEffect } from 'react';
import type { Card, Leader, EfectValues, TurnActionLog, GameInitResponse } from '../../../shared/types';
import type { GameContext } from '../../../shared/game';
import { executeGameEffect } from '../effects';
import { conditionCheck } from '../conditions';
import type { TargetingContext } from '../effects/selectTarget';
import { checkAndApplyZoneEffects } from './utils/zoneAbilityHandler';
import { resolveTriggerEffects } from './utils/triggerEffects';
import type { CardCondition } from '../conditions';

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

  const cloneCards = (cards: Card[]): Card[] => cards.map(card => ({ ...card }));

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

  const mergeGameEffectResult = (ctx: GameContext, result: any) => {
    if (!result) return;
    if (result.myField) ctx.field = cloneCards(result.myField);
    if (result.enemyField) ctx.enemyField = cloneCards(result.enemyField);
    if (result.hand) ctx.hand = cloneCards(result.hand.filter(Boolean));
    if (result.deck) ctx.deck = cloneCards(result.deck);
    if (result.token) ctx.token = cloneCards(result.token);
    if (result.myHealth !== undefined) ctx.myHealth = result.myHealth;
    if (result.enemyHealth !== undefined) ctx.enemyHealth = result.enemyHealth;
    if (result.pp !== undefined) ctx.pp = result.pp;
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
    if (ctx.deck.length === 0) {
      alert("バトルに敗北しました。");
      return;
    }
    const [firstCard, ...rest] = ctx.deck;
    if (ctx.hand.length < 10) {
      ctx.hand = [...ctx.hand, firstCard];
    }
    ctx.deck = rest;
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
    let ctx = createCurrentContext();

    const resetField = ctx.field.map(card => ({
      ...card,
      hasAttacked: false,
      playedThisTurn: false
    }));

    const turnEndResult = resolveTriggerEffects(resetField, {
      ...ctx,
      field: resetField
    }, 'TurnEnd');
    
    ctx = { ...ctx, ...turnEndResult };

    ctx.turn += 1;
    ctx.maxPP = Math.min(ctx.maxPP + 1, 10);
    ctx.pp = ctx.maxPP;
    ctx.turnLog.oneTurnPlayCount = 0;
    ctx.hasEvolvedThisTurn = false;

    drawCardCtx(ctx);
    reflectContext(ctx);
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
    const ctx = createCurrentContext();
    
    executeEvolveFollower(ctx, targetId);
    
    reflectContext(ctx);
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
    const ctx = createCurrentContext();
    executeExEvolveFollower(ctx, targetInstanceId);
    reflectContext(ctx);
  };

  const executeAttackToFollower = (ctx: GameContext, myInstanceId: string, enemyInstanceId: string) => {
    const targetCard = ctx.field.find(f => f.instanceId === myInstanceId);
    const targetEnemyCard = ctx.enemyField.find(f => f.instanceId === enemyInstanceId);
    if (!targetCard || !targetEnemyCard) return;

    const oldMyField = cloneCards(ctx.field);
    const isExEvolved = targetCard.isExEvolved;
    const currentDefense = isExEvolved ? targetCard.defense : targetCard.defense - targetEnemyCard.attack;
    const currentEnemyDefense = targetEnemyCard.defense - targetCard.attack;

    const destroyedMyCards = currentDefense <= 0 ? [targetCard] : [];

    if (currentDefense <= 0) {
      ctx.field = ctx.field.filter(f => f.instanceId !== myInstanceId);
    } else {
      ctx.field = ctx.field.map(c =>
        c.instanceId === myInstanceId ? { ...c, hasAttacked: true, defense: currentDefense } : c
      );
    }

    if (currentEnemyDefense <= 0) {
      ctx.enemyField = ctx.enemyField.filter(f => f.instanceId !== enemyInstanceId);
      ctx.enemyHealth -= isExEvolved ? 1 : 0;
    } else {
      ctx.enemyField = ctx.enemyField.map(c =>
        c.instanceId === enemyInstanceId ? { ...c, defense: currentEnemyDefense } : c
      );
    }

    ctx.hand = checkAndApplyZoneEffects(ctx.hand, {
      oldField: oldMyField,
      newField: ctx.field
    });

    if (destroyedMyCards.length > 0) {
      const lwResult = resolveTriggerEffects(destroyedMyCards, ctx, 'LastWord');
      mergeGameEffectResult(ctx, lwResult);
    }   

    setSelectedMyCardId(null);
  };

  const attackToFollower = (myInstanceId: string, enemyInstanceId: string) => {
    const ctx = createCurrentContext();
    executeAttackToFollower(ctx, myInstanceId, enemyInstanceId);
    reflectContext(ctx);
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

  const applyCardEffect = (effectType: string | undefined, values: EfectValues, targetIndex?: number, selfInstanceId?: string) => {
    if (!effectType) return;
    let ctx = createCurrentContext();
    const result = executeGameEffect(effectType, values, ctx, targetIndex, selfInstanceId);
    ctx = { ...ctx, ...result };
    reflectContext(ctx);
  };

  const executeCardPlay = (ctx: GameContext, targetCard: Card, targetIndex: number | null = null) => {
    ctx.pp -= targetCard.cost;
    
    if (targetCard.type === 'Follower') ctx.turnLog.followersSummoned++;
    else if (targetCard.type === 'Spell') ctx.turnLog.spellsCast++;
    else if (targetCard.type === 'Amulet') ctx.turnLog.amuletsPlaced++;
    
    ctx.turnLog.oneTurnPlayCount++;
    ctx.turnLog.cardPlayed = [...ctx.turnLog.cardPlayed, targetCard];
    
    targetCard.playedThisTurn = true;
    const fieldBeforePlay = cloneCards(ctx.field);

    ctx.hand = ctx.hand.filter(c => c && c.instanceId !== targetCard.instanceId);

    if (targetCard.type === 'Follower' || targetCard.type === 'Amulet') {
      const isFollower = targetCard.type === 'Follower';
      const hasShissou = targetCard.abilities?.some(a => a.abilityType === 'SHISSOU') ?? false;
      ctx.field.push({
        ...targetCard,
        hasAttacked: isFollower && hasShissou ? false : true
      });
    }

    const oldMyField = cloneCards(ctx.field);

    targetCard.abilities.forEach(ability => {
      if (ability.trigger !== 'Fanfare') return;

      const conditionObj = {
        type: ability.conditionType, 
        subType: ability.triggerConditions, 
        value: ability.conditionValue ?? null
      } as CardCondition;
      
      let isConditionMet = true;
      if (ability.conditionType && ability.triggerConditions) {
        const resultObj = conditionCheck({ ...ctx, field: fieldBeforePlay }, conditionObj);
        isConditionMet = resultObj.condition;
      }

      const isSelectable = ability.effectType === 'SelectBounce' 
        ? ctx.field.length >= 1 
        : ['SelectDamage', 'SelectDestroy', 'SelectStatsFix'].includes(ability.effectType ?? '')
          ? ctx.enemyField.length >= 1 
          : true;

      if (isConditionMet && isSelectable) {
        const result = executeGameEffect(ability.effectType ?? '', ability.values ?? {}, ctx, targetIndex, targetCard.instanceId);
        mergeGameEffectResult(ctx, result);

        ctx.hand = checkAndApplyZoneEffects(ctx.hand, {
          oldField: oldMyField,
          newField: ctx.field
        });
      }
    });
  };

  const selectTargetFollower = (targetIndex: number) => {
    if (!targetingContext) return;
    const ctx = createCurrentContext();
    
    if (evoledSelectTargetId === null) {
      executeCardPlay(ctx, targetingContext.card, targetIndex);
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
    
    setTargetingContext(null);
    reflectContext(ctx);
  };

  const cancelTargeting = () => {
    setTargetingContext(null);
    setEvoledSelectTargetId(null);
  };

  const playCard = (targetCard: Card) => {
    const ctx = createCurrentContext();

    if (ctx.pp < targetCard.cost) {
      alert("ppが足りません。");
      return;
    }
    if (ctx.field.length >= 5 && (targetCard.type === 'Follower' || targetCard.type === 'Amulet')) return;

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
          ...ctx.turnLog,
          oneTurnPlayCount: ctx.turnLog.oneTurnPlayCount + 1
        };

        let virtualField = cloneCards(ctx.field);
        if (targetCard.type === 'Follower' || targetCard.type === 'Amulet') {
          virtualField.push({
            ...targetCard,
            playedThisTurn: true
          });
        }

        const resultObj = conditionCheck(
          { ...ctx, field: virtualField, turnLog: virtualTurnLog }, 
          conditionObj
        );
        isConditionMet = resultObj.condition;
      }

      const isBounce = fanfareAbility.effectType === 'SelectBounce';
      const hasValidTarget = isBounce ? ctx.field.length >= 1 : ctx.enemyField.length >= 1;
      
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

    executeCardPlay(ctx, targetCard);
    reflectContext(ctx);
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