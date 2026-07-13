import type { GameContext } from '../../../../shared/game';
import type { Card } from '../../../../shared/types';
import type { CardCondition } from '../../conditions';
import { cloneCards } from '../utils/cardUtils';
import { checkAndApplyZoneEffects } from '../../hooks/utils/zoneAbilityHandler';

interface PlayCardDependencies {
  conditionCheck: (ctx: any, condition: CardCondition) => { condition: boolean };
  executeGameEffect: (effectType: string, values: any, ctx: GameContext, targetIndex: number | null, instanceId: string) => any;
  mergeGameEffectResult: (ctx: GameContext, result: any) => void;
  setTargetingContext: (context: any) => void;
}

export const executeCardPlay = (
  ctx: GameContext,
  targetCard: Card,
  targetIndex: number | null = null,
  deps: PlayCardDependencies
) => {
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
      const resultObj = deps.conditionCheck({ ...ctx, field: fieldBeforePlay }, conditionObj);
      isConditionMet = resultObj.condition;
    }

    const isSelectable = ability.effectType === 'SelectBounce' 
      ? ctx.field.length >= 1 
      : ['SelectDamage', 'SelectDestroy', 'SelectStatsFix'].includes(ability.effectType ?? '')
        ? ctx.enemyField.length >= 1 
        : true;

    if (isConditionMet && isSelectable) {
      const result = deps.executeGameEffect(
        ability.effectType ?? '', 
        ability.values ?? {}, 
        ctx, 
        targetIndex, 
        targetCard.instanceId
      );
      deps.mergeGameEffectResult(ctx, result);
      ctx.hand = checkAndApplyZoneEffects(ctx.hand, { oldField: oldMyField, newField: ctx.field });
    }
  });
};