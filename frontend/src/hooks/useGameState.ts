// src/hooks/useGameState.ts
import { useState, useEffect } from 'react';
import type { Card, Leader, EfectValues } from '../../../shared/types';
import type { TurnActionLog } from '../../../shared/types';
import type { GameInitResponse } from '../../../shared/types';
import {  executeGameEffect } from '../effects';
import { conditionCheck } from '../conditions';
import type { TargetingContext } from '../effects/selectTarget';
import { checkAndApplyZoneEffects } from './utils/zoneAbilityHandler';
import { checkAndApplyLastWords } from './utils/lastWordHandler';

export function useGameState() {
  const [hand, setHand] = useState<Card[]>([]);
  const [field, setField] = useState<Card[]>([]);
  const [pp, setPP] = useState(1);
  const [enemyHealth, setEnemyHealth] = useState(20);
  const [myHealth, setMyHealth] = useState(20);
  const [maxPP, setMaxPP] = useState(1);
  const [turn, setTurn] = useState(1);
  const [myEp, setMyEP] = useState(2);
  const [enemyEp, setEnemyEP] = useState(2);
  const [myExEp, setMyExEp] = useState(2);
  const [enemyExEp, setEnemyExEP] = useState(2);
  const [hasEvolvedThisTurn, setHasEvolvedThisTurn] = useState(false);
  const [deck, setDeck] = useState<Card[]>([]);
  const [token, setToken] = useState<Card[]>([]);
  const [myLeader, setMyLeader] = useState<Leader>();
  const [enemyLeader, setEnemyLeader] = useState<Leader>();
  const [isMulligan, setIsMulligan] = useState(true);
  const [enemyField, setEnemyField] = useState<Card[]>([]);
  const [selectedMyCardId, setSelectedMyCardId] = useState<string | null>(null);
  const [targetingContext, setTargetingContext] = useState<TargetingContext | null>(null);
  const [evoledSelectTargetId, setEvoledSelectTargetId] = useState<string | null>(null);
  const [turnLog, setTurnLog] = useState<TurnActionLog>({
    cardPlayed: [],
    followersSummoned: 0,
    spellsCast: 0,
    oneTurnPlayCount: 0,
  });

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

  const handleMulliganConfirm = (selectCards: Card[]) => {
    const count = selectCards.length;
    const newDrawnCards = deck.slice(0, count);
    const remainigDeck = deck.slice(count);

    const finalHand = hand
      .filter(h => !selectCards.some(s => s.instanceId === h.instanceId))
      .concat(newDrawnCards);

    const finalDeck = shuffle([...remainigDeck, ...selectCards]);

    setHand(finalHand);
    setDeck(finalDeck);
    setIsMulligan(false);

    startTurn(finalHand, finalDeck);
  };

  const drawCard = (array: Card[], array2: Card[]) => {
    if (array2.length === 0) {
      alert("バトルに敗北しました。");
      return 0;
    }
    const [firstCard, ...rest] = array2;
    if (array.length + 1 >= 10) {
      setHand(array);
    } else {
      setHand([...array, firstCard]);
    }
    setDeck(rest);
  };

  const startTurn = (array: Card[], array2: Card[]) => {
    drawCard(array, array2);
  };

  const assignInstanceIds = (cards: Card[]): Card[] => {
    return cards.map(card => ({
      ...card,
      instanceId: card.instanceId || crypto.randomUUID()
    }));
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/game-start')
      .then(res => res.json())
      .then((data: GameInitResponse) => {
        const cardsWithId = assignInstanceIds(data.cards);
        const shuffled = shuffle(cardsWithId);
        const initialHand = shuffled.slice(0, 4);
        const remainigDeck = shuffled.slice(4);

        setHand(initialHand);
        setDeck(remainigDeck);
        setMyLeader(data.myLeader);
        setEnemyLeader(data.enemyLeader);
        setToken(data.token);
      });
  }, []);

  const endTurn = () => {
    setTurn(prev => prev + 1);
    const nextMaxPP = Math.min(maxPP + 1, 10);
    const currentLog = turnLog;
    currentLog.oneTurnPlayCount = 0;
    setMaxPP(nextMaxPP);
    setPP(nextMaxPP);
    setTurnLog(currentLog);
    setField(prevField => prevField.map(card => ({ ...card, hasAttacked: false, playedThisTurn: false })));
    setHasEvolvedThisTurn(false);

    startTurn(hand, deck);
  };

  const attackToLeader = (targetInstanceId: string) => {
    const targetCard = field.find(f => f.instanceId === targetInstanceId);
    if (!targetCard) return;

    const hasStrom = targetCard.abilities.some(a => a.abilityType === 'SHISSOU');
    if (targetCard.playedThisTurn && !hasStrom) {
      alert("このフォロワーは、場に出たターンにはリーダーを攻撃できません。");
      return;
    }

    if (targetCard.hasAttacked) {
      alert("このフォロワーはもう攻撃できません。");
      return;
    }

    if (enemyHealth - targetCard.attack <= 0) {
      setEnemyHealth(prev => prev - (targetCard.attack || 0));
      alert("バトルに勝利しました。");
      return 0;
    }

    setEnemyHealth(prev => prev - (targetCard.attack || 0));
    setField(prevField => prevField.map(card => 
      card.instanceId === targetInstanceId ? { ...card, hasAttacked: true } : card
    ));
    setSelectedMyCardId(null);
  };
  
  const applyEvolution = (targetInstanceId: string) => {
    setMyEP(prev => prev - 1);
    setHasEvolvedThisTurn(true);

    setField(prevField => prevField.map(card => 
      card.instanceId === targetInstanceId ? {
        ...card,
        attack: card.attack + 2,
        defense: card.defense + 2,
        isEvolved: true,
        hasAttacked: false,
      } : card
    ));
  }

  const evolveFollower = (targetInstanceId: string) => {
    const targetCard = field.find(f => f.instanceId === targetInstanceId);
    if (!targetCard) return;

    if (turn < 4) {
      alert("進化可能ターンではありません。");
      return;
    }
    if (myEp <= 0) {
      alert("EPが足りません。");
      return;
    }
    if (hasEvolvedThisTurn) {
      alert("1ターンに進化できるのは1度だけです。");
      return;
    }
    if (targetCard.isEvolved) {
      alert("すでに進化済みのフォロワーです。");
      return;
    }
    let applyChk = false;
    targetCard.abilities.forEach(ability => {
      let conditionObj: any = null;
      let conditionType = ability.conditionType;
      let triggerConditions = ability.triggerConditions;
      let conditionValue = ability.conditionValue ? ability.conditionValue : null;

      conditionObj = {type: conditionType, subType: triggerConditions, value: conditionValue};
      let condition = true;
      if (conditionType && triggerConditions) {
        let resultObj = conditionCheck({ field, enemyField, hand, deck, turnLog}, conditionObj);
        condition = resultObj.condition;
      }

      if (condition && ability.trigger === 'Evolve' && ability.effectType !== 'SelectDamage' && ability.effectType !== 'SelectDestroy' && ability.effectType !== 'SelectStatsFix' && ability.effectType !== 'SelectBounce') {
        applyCardEffect(ability.effectType, ability.values ?? {});
      } else if (condition && ability.trigger === 'Evolve' && (ability.effectType === 'SelectDamage' || ability.effectType === 'SelectDestroy' || ability.effectType === 'SelectStatsFix' || ability.effectType === 'SelectBounce')) {

        const isBounce = ability.effectType === 'SelectBounce';
        const hasValidTarget = isBounce ? field.length >= 1 : enemyField.length >= 1;

        if (hasValidTarget) {
          setTargetingContext({
            card: targetCard,
            effectType: ability.effectType,
            values: ability.values ?? {},
            targetTeam: isBounce ? 'my' : 'enemy'
          });
          setEvoledSelectTargetId(targetInstanceId);
          applyChk = true;
        }
      }
    });

    if (!applyChk) {
      applyEvolution(targetInstanceId);
    }
  };

  const exEvolveFollower = (targetInstanceId: string) => {
    const targetCard = field.find(f => f.instanceId === targetInstanceId);
    if (!targetCard) return;

    if (turn < 6) {
      alert("超進化可能ターンではありません。");
      return;
    }
    if (myExEp <= 0) {
      alert("EXEPが足りません。");
      return;
    }
    if (hasEvolvedThisTurn) {
      alert("1ターンに進化できるのは1度だけです。");
      return;
    }
    if (targetCard.isEvolved) {
      alert("すでに進化済みのフォロワーです。");
      return;
    }

    setMyExEp(prev => prev - 1);
    setHasEvolvedThisTurn(true);

    setField(prevField => prevField.map(card => 
      card.instanceId === targetInstanceId ? {
        ...card,
        attack: card.attack + 3,
        defense: card.defense + 3,
        isEvolved: true,
        hasAttacked: false,
        isExEvolved: true,
      } : card
    ));
  };

  const attackToFollower = (myInstanceId: string, enemyInstanceId: string) => {
    const targetCard = field.find(f => f.instanceId === myInstanceId);
    const targetEnemyCard = enemyField.find(f => f.instanceId === enemyInstanceId);
    if (!targetCard || !targetEnemyCard) return;

    const isExEvoled = targetCard.isExEvolved;
    const currentDefense = isExEvoled ? targetCard.defense : targetCard.defense - targetEnemyCard.attack;
    const currentEnemyDefense = targetEnemyCard.defense - targetCard.attack;

    const destroyedMyCards = currentDefense <= 0 ? [targetCard] : [];

    let nextField: Card[] = [];
    if (currentDefense <= 0) {
      nextField = field.filter(f => f.instanceId !== myInstanceId);
    } else {
      nextField = field.map(c =>
        c.instanceId === myInstanceId ? { ...c, hasAttacked: true, defense: currentDefense } : c
      );
    }

    let nextEnemyField: Card[] = [];
    let nextEnemyHealth = enemyHealth;
    if (currentEnemyDefense <= 0) {
      nextEnemyField = enemyField.filter(f => f.instanceId !== enemyInstanceId);
      const damage = isExEvoled ? 1 : 0;
      nextEnemyHealth = enemyHealth - damage;
    } else {
      nextEnemyField = enemyField.map(c =>
        c.instanceId === enemyInstanceId ? { ...c, defense: currentEnemyDefense } : c
      );
    }

    const updatedHand = checkAndApplyZoneEffects(hand, {
      oldField: field,
      newField: nextField
    });

    let currentContext = {
      field: nextField,
      enemyField: nextEnemyField,
      hand: updatedHand,
      deck: deck,
      myHealth: myHealth,
      enemyHealth: nextEnemyHealth,
    };

    if (destroyedMyCards.length > 0) {
      const lwResult = checkAndApplyLastWords(destroyedMyCards, {
        ...currentContext,
        token,
        turnLog
      });
      currentContext = { ...currentContext, ...lwResult };
    }    

    setField(currentContext.field);
    setEnemyField(currentContext.enemyField);
    setHand(currentContext.hand);
    setDeck(currentContext.deck);
    setMyHealth(currentContext.myHealth);
    setEnemyHealth(currentContext.enemyHealth);

    setSelectedMyCardId(null);
  };

  const enemyPlayCard = () => {
    let enemyCard: Card | null = null;
    for (let i = 0; i < deck.length; i++) {
      if (deck[i].type === 'Follower') {
        enemyCard = deck[i];
        break;
      }
    }
    if (!enemyCard || enemyField.length >= 5) return;
    const enemyCardWithId = enemyCard.instanceId ? enemyCard : { ...enemyCard, instanceId: crypto.randomUUID() };
    setEnemyField(prev => [...prev, enemyCardWithId]);
  };

  const applyCardEffect = (effectType: string | undefined, values: EfectValues, targetIndex?: number, selfInstanceId?: string) => {
    if (!effectType) return;

    const result = executeGameEffect(effectType, values, { field, enemyField, hand, deck, myHealth, enemyHealth, token, turnLog}, targetIndex, selfInstanceId);
    
    if (result.enemyField) setEnemyField(result.enemyField);
    if (result.myField) setField(result.myField);
    if (result.hand) setHand(result.hand);
    if (result.deck) setDeck(result.deck);
    if (result.myHealth) setMyHealth(result.myHealth);
    if (result.enemyHealth) setEnemyHealth(result.enemyHealth);
  };

 const executeCardPlay = (targetCard: Card, targetIndex: number | null = null) => {
    setPP(prev => prev - targetCard.cost);
    const currentLog = turnLog;
    if (targetCard.type === 'Follower') {
      currentLog.followersSummoned++;
    } else if (targetCard.type === 'Spell') {
      currentLog.spellsCast++;
    }
    currentLog.oneTurnPlayCount++;
    const finalPlayed = [...currentLog.cardPlayed, targetCard];
    currentLog.cardPlayed = finalPlayed;
    setTurnLog(currentLog);
    
    targetCard.playedThisTurn = true;

    let currentHand = hand.filter(c => c.instanceId !== targetCard.instanceId);
    let currentField = [...field];
    let currentEnemyField = [...enemyField];
    let currentDeck = [...deck];
    let currentMyHealth = myHealth;
    let currentEnemyHealth = enemyHealth;

    if (targetCard.type === 'Follower') {
      const hasShissou = targetCard.abilities.some(ability => ability.abilityType === 'SHISSOU');
      const playedFollower = {
        ...targetCard,
        hasAttacked: hasShissou ? false : targetCard.hasAttacked
      };
      currentField.push(playedFollower);
    }

    targetCard.abilities.forEach(ability => {
      let conditionObj: any = null;
      let conditionType = ability.conditionType;
      let triggerConditions = ability.triggerConditions;
      let conditionValue = ability.conditionValue ? ability.conditionValue : null;

      conditionObj = {type: conditionType, subType: triggerConditions, value: conditionValue};
      let condition = true;
      if (conditionType && triggerConditions) {
        let resultObj = conditionCheck({ field, enemyField, hand, deck, turnLog}, conditionObj);
        condition = resultObj.condition;
      }

      let selectable = true;
      if (ability.effectType === 'SelectBounce') {
        selectable = field.length >= 1 ? true : false;
      } else if (ability.effectType === 'SelectDamage' || ability.effectType === 'SelectDestroy' || ability.effectType === 'SelectStatsFix') {
        selectable = enemyField.length >= 1 ? true : false;
      }

      if (condition && ability.trigger === 'Fanfare' && selectable) {
        const oldMyField = [...currentField];
        const oldEnemyField = [...currentEnemyField];

        const result = executeGameEffect(
          ability.effectType ?? '', 
          ability.values ?? {}, 
          { field: currentField, enemyField: currentEnemyField, hand: currentHand, deck: currentDeck, myHealth: currentMyHealth, enemyHealth: currentEnemyHealth, token, turnLog }, 
          targetIndex, 
          targetCard.instanceId
        );

        if (result.myField) currentField = result.myField;
        if (result.enemyField) currentEnemyField = result.enemyField;
        if (result.hand) currentHand = result.hand;
        if (result.deck) currentDeck = result.deck;
        if (result.myHealth) currentMyHealth = result.myHealth;
        if (result.enemyHealth) currentEnemyHealth = result.enemyHealth;

        currentHand = checkAndApplyZoneEffects(currentHand, {
          oldField: oldMyField,
          newField: currentField
        });
      }
    });

    setHand(currentHand);
    setField(currentField);
    setEnemyField(currentEnemyField);
    setDeck(currentDeck);
    setMyHealth(currentMyHealth);
    setEnemyHealth(currentEnemyHealth);
  };

  const selectTargetFollower = (targetIndex: number) => {
    if (!targetingContext) return;
    if (evoledSelectTargetId === null) {
      executeCardPlay(targetingContext.card, targetIndex);
    } else {
      applyCardEffect(targetingContext.effectType, targetingContext.values, targetIndex);
    }
    
    if (evoledSelectTargetId !== null) {
      applyEvolution(evoledSelectTargetId);
      setEvoledSelectTargetId(null);
    }
    setTargetingContext(null);
  };

  const cancelTargeting = () => {
    setTargetingContext(null);
    setEvoledSelectTargetId(null);
  };

  const playCard = (targetCard: Card) => {
    if (pp < targetCard.cost) {
      alert("ppが足りません。");
      return;
    }
    if (field.length >= 5 && targetCard.type === 'Follower') return;

    const fanfareAbility = targetCard.abilities.find(
      a => a.trigger === 'Fanfare' && (a.effectType === 'SelectDamage' || a.effectType === 'SelectDestroy' || a.effectType === 'SelectStatsFix' || a.effectType === 'SelectBounce')
    );

    if (fanfareAbility) {
      let isConditionMet = true;
      let conditionObj: any = null;
      let conditionType = fanfareAbility.conditionType;
      let triggerConditions = fanfareAbility.triggerConditions;
      let conditionValue = fanfareAbility.conditionValue ? fanfareAbility.conditionValue : null;
      if (fanfareAbility.conditionType && fanfareAbility.triggerConditions) {
        conditionObj = {type: conditionType, subType: triggerConditions, value: conditionValue};

        const virtualTurnLog = {
          ...turnLog,
          oneTurnPlayCount: turnLog.oneTurnPlayCount + 1
        };
        const resultObj = conditionCheck(
          { field, enemyField, hand, deck, turnLog: virtualTurnLog }, 
          conditionObj
        );
        isConditionMet = resultObj.condition;
      }

      const isBounce = fanfareAbility.effectType === 'SelectBounce';
      const hasValidTarget = isBounce ? field.length >= 1 : enemyField.length >= 1;
      if (!hasValidTarget && targetCard.type === 'Spell') {
        return;
      }
      if (isConditionMet && hasValidTarget) {
        setTargetingContext({
          card: targetCard,
          effectType: fanfareAbility.effectType as 'SelectDamage' | 'SelectDestroy' | 'SelectStatsFix' | 'SelectBounce',
          values: fanfareAbility.values ?? {},
          targetTeam: isBounce ? 'my' : 'enemy'
        });
        return;
      }
    }

    executeCardPlay(targetCard);
  };

  const damageMyLeader = (amount: number) => {
    setMyHealth(prev => Math.max(0, prev - amount));
  };

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