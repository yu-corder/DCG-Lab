import type { GameContext } from '../../../../shared/game';
import type { Card } from '../../../../shared/types';

export const executeEnemyPlayCard = (ctx: GameContext) => {
  let enemyCard: Card | null = null;
  
  for (let i = 0; i < ctx.deck.length; i++) {
    if (ctx.deck[i].type === 'Follower') {
      enemyCard = ctx.deck[i];
      break;
    }
  }
  
  if (!enemyCard || ctx.enemyField.length >= 5) return;
  
  const enemyCardWithId = enemyCard.instanceId 
    ? enemyCard 
    : { ...enemyCard, instanceId: crypto.randomUUID() };
  
  ctx.enemyField = [...ctx.enemyField, enemyCardWithId];
};