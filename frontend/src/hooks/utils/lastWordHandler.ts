import type { Card, EfectValues } from '../../../../shared/types';
import { executeGameEffect } from '../../effects';

interface GameContext {
  field: Card[];
  enemyField: Card[];
  hand: Card[];
  deck: Card[];
  myHealth: number;
  enemyHealth: number;
  token: Card[];
  turnLog: any;
}

export const checkAndApplyLastWords = (
  destroyedCards: Card[],
  context: GameContext
): Omit<GameContext, 'token' | 'turnLog'> => {
  let currentField = [...context.field];
  let currentEnemyField = [...context.enemyField];
  let currentHand = [...context.hand];
  let currentDeck = [...context.deck];
  let currentMyHealth = context.myHealth;
  let currentEnemyHealth = context.enemyHealth;

  destroyedCards.forEach(card => {
    card.abilities.forEach(ability => {
      if (ability.trigger === 'LastWord' && ability.effectType) {
        const result = executeGameEffect(
          ability.effectType,
          ability.values ?? {},
          {
            field: currentField,
            enemyField: currentEnemyField,
            hand: currentHand,
            deck: currentDeck,
            myHealth: currentMyHealth,
            enemyHealth: currentEnemyHealth,
            token: context.token,
            turnLog: context.turnLog
          },
          undefined,
          card.instanceId
        );

        if (result.myField) currentField = result.myField;
        if (result.enemyField) currentEnemyField = result.enemyField;
        if (result.hand) currentHand = result.hand;
        if (result.deck) currentDeck = result.deck;
        if (result.myHealth) currentMyHealth = result.myHealth;
        if (result.enemyHealth) currentEnemyHealth = result.enemyHealth;
      }
    });
  });

  return {
    field: currentField,
    enemyField: currentEnemyField,
    hand: currentHand,
    deck: currentDeck,
    myHealth: currentMyHealth,
    enemyHealth: currentEnemyHealth,
  };
};