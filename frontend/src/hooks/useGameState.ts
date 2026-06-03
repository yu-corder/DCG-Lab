// src/hooks/useGameState.ts
import { useState, useEffect } from 'react';
import type { Card } from '../../../shared/types';
import { EffectRegistry } from '../effects';
import type { TargetingContext } from '../effects/selectTarget';

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
  const [isMulligan, setIsMulligan] = useState(true);
  const [enemyField, setEnemyField] = useState<Card[]>([]);
  const [selectedMyCardIndex, setSelectedMyCardIndex] = useState<number | null>(null);
  const [targetingContext, setTargetingContext] = useState<TargetingContext | null>(null);

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
      .filter(h => !selectCards.some(s => s.id === h.id))
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

  useEffect(() => {
    fetch('http://localhost:3000/api/cards')
      .then(res => res.json())
      .then((data: Card[]) => {
        const shuffled = shuffle(data);
        const initialHand = shuffled.slice(0, 4);
        const remainigDeck = shuffled.slice(4);

        setHand(initialHand);
        setDeck(remainigDeck);
      });
  }, []);

  const endTurn = () => {
    setTurn(prev => prev + 1);
    const nextMaxPP = Math.min(maxPP + 1, 10);
    setMaxPP(nextMaxPP);
    setPP(nextMaxPP);
    setField(prevField => prevField.map(card => ({ ...card, hasAttacked: false, playedThisTurn: false })));
    setHasEvolvedThisTurn(false);
    console.log(`Turn ${turn + 1} stared. MaxPP is ${nextMaxPP}`);

    startTurn(hand, deck);
  };

  const attackToLeader = (cardIndex: number) => {
    const targetCard = field[cardIndex];
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

    setField(prevField => {
      const newField = [...prevField];
      newField[cardIndex] = { ...targetCard, hasAttacked: true };
      return newField;
    });
    setSelectedMyCardIndex(null);
    console.log(`${targetCard.name}の攻撃!`);
  };

  const evolveFollower = (cardIndex: number) => {
    const targetCard = field[cardIndex];
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

    setMyEP(prev => prev - 1);
    setHasEvolvedThisTurn(true);

    setField(prevField => {
      const newField = [...prevField];
      newField[cardIndex] = {
        ...targetCard,
        attack: targetCard.attack + 2,
        defense: targetCard.defense + 2,
        isEvolved: true,
        hasAttacked: false,
      };
      return newField;
    });
  };

  const exEvolveFollower = (cardIndex: number) => {
    const targetCard = field[cardIndex];
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

    setField(prevField => {
      const newField = [...prevField];
      newField[cardIndex] = {
        ...targetCard,
        attack: targetCard.attack + 3,
        defense: targetCard.defense + 3,
        isEvolved: true,
        hasAttacked: false,
        isExEvolved: true,
      };
      return newField;
    });
  };

  const attackToFollower = (myCardIndex: number, enemyCardIndex: number) => {
    const targetCard = field[myCardIndex];
    const targetEnemyCard = enemyField[enemyCardIndex];
    const isExEvoled = targetCard.isExEvolved;

    const currentDefense = isExEvoled ? targetCard.defense : targetCard.defense - targetEnemyCard.attack;
    const currentEnemyDefense = targetEnemyCard.defense - targetCard.attack;

    if (currentDefense <= 0) {
      setField(prev => prev.filter(f => f.id !== targetCard.id));
    } else {
      setField(prev => prev.map((c, i) =>
        i === myCardIndex ? { ...c, hasAttacked: true, defense: currentDefense } : c
      ));
    }

    if (currentEnemyDefense <= 0) {
      setEnemyField(prev => prev.filter(f => f.id !== targetEnemyCard.id));
      const damage = isExEvoled ? 1 : 0;
      setEnemyHealth(prev => prev - damage);
    } else {
      setEnemyField(prev => prev.map((c, i) =>
        i === enemyCardIndex ? { ...c, defense: currentEnemyDefense } : c
      ));
    }

    setSelectedMyCardIndex(null);
  };

  const enemyPlayCard = () => {
    console.log("EnemyPlay!");
    const enemyCard = deck.slice(0, 1);
    if (enemyField.length >= 5) return;
    setEnemyField(prev => [...prev, ...enemyCard]);
  };

  const applyCardEffect = (effectType: string, value: number) => {
    const effect = EffectRegistry[effectType];
    if (!effect) return;

    const result = effect.execute({ field, enemyField, hand, deck }, value);
    if (result.enemyField) setEnemyField(result.enemyField);
    if (result.myField) setField(result.myField);
    if (result.hand) setHand(result.hand);
    if (result.deck) setDeck(result.deck);
  };

  const selectTargetFollower = (targetIndex: number) => {
    if (!targetingContext) return;
    if (targetingContext.effectType === 'SelectDamage') {
      const effect = EffectRegistry['SelectDamage'];
      if (effect) {
        const result = effect.execute({ field, enemyField, hand, deck }, targetingContext.value, targetIndex);
        if (result.enemyField) setEnemyField(result.enemyField);
      }
    }
    setTargetingContext(null);
  };

  const playCard = (targetCard: Card) => {
    if (pp < targetCard.cost) {
      alert("ppが足りません。");
      return;
    }
    if (field.length >= 5) return;

    console.log("aiueo");
    setHand(prev => prev.filter(c => c.id !== targetCard.id));
    setPP(prev => prev - targetCard.cost);

    console.log(targetCard);
    targetCard.playedThisTurn = true;
    targetCard.abilities.forEach(ability => {
      if (ability.trigger === 'Fanfare') {
        if (ability.effectType === 'SelectDamage') {
          setTargetingContext({
            sourceCardId: targetCard.id,
            effectType: 'SelectDamage',
            value: ability.value || 0
          });
        } else {
          applyCardEffect(ability.effectType, ability.value);
        }
        
      }
      if (ability.abilityType === 'SHISSOU') {
        targetCard.hasAttacked = false;
        console.log(targetCard.hasAttacked);
      }
    });
    setField(prev => [...prev, targetCard]);
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
    selectedMyCardIndex,
    targetingContext,
    selectTargetFollower,
    setSelectedMyCardIndex,
    handleMulliganConfirm,
    endTurn,
    attackToLeader,
    evolveFollower,
    exEvolveFollower,
    attackToFollower,
    enemyPlayCard,
    playCard,
  };
}