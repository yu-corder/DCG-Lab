import type { GameContext } from '../../../../shared/game';
import { cloneCards } from '../utils/cardUtils';
import { resolveTriggerEffects } from '../../hooks/utils/triggerEffects';
import { checkAndApplyZoneEffects } from '../../hooks/utils/zoneAbilityHandler';


export const executeAttackToFollower = (
  ctx: GameContext,
  myInstanceId: string,
  enemyInstanceId: string,
  mergeFn: (ctx: GameContext, result: any) => void
) => {
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
    ctx.field = ctx.field.map(c => c.instanceId === myInstanceId ? { ...c, hasAttacked: true, defense: currentDefense } : c);
  }

  if (currentEnemyDefense <= 0) {
    ctx.enemyField = ctx.enemyField.filter(f => f.instanceId !== enemyInstanceId);
    ctx.enemyHealth -= isExEvolved ? 1 : 0;
  } else {
    ctx.enemyField = ctx.enemyField.map(c => c.instanceId === enemyInstanceId ? { ...c, defense: currentEnemyDefense } : c);
  }

  ctx.hand = checkAndApplyZoneEffects(ctx.hand, {
    oldField: oldMyField,
    newField: ctx.field
  });
  
  if (destroyedMyCards.length > 0) {
    const lwResult = resolveTriggerEffects(destroyedMyCards, ctx, 'LastWord');
    mergeFn(ctx, lwResult);
  }   
};