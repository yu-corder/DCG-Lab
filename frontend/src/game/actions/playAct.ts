import type { GameContext } from '../../../../shared/game';
import type { Card } from '../../../../shared/types';
import { cloneCards } from '../utils/cardUtils';
import { checkAndApplyZoneEffects } from '../../hooks/utils/zoneAbilityHandler';

interface ActCardDependencies {
  executeGameEffect: (effectType: string, values: any, ctx: GameContext, targetIndex: number | null, instanceId: string) => any;
  mergeGameEffectResult: (ctx: GameContext, result: any) => void;
  setTargetingContext: (context: any) => void;
}

export const executePlayAct = (
  ctx: GameContext,
  targetCard: Card,
  targetIndex: number | null = null,
  deps: ActCardDependencies
) => {
  ctx.pp -= targetCard.actCost;
  ctx.hand = ctx.hand.filter(c => c && c.instanceId !== targetCard.instanceId);

  const oldMyField = cloneCards(ctx.field);

  targetCard.abilities.forEach(ability => {
    if (ability.trigger !== 'Act') return;
    if (['SelectDamage', 'SelectDestroy', 'SelectStatsFix', 'SelectBounce'].includes(ability.effectType ?? '')) return;
    
    const result = deps.executeGameEffect(
    ability.effectType ?? '', 
    ability.values ?? {}, 
    ctx, 
    targetIndex, 
    targetCard.instanceId
    );
    deps.mergeGameEffectResult(ctx, result);
    ctx.hand = checkAndApplyZoneEffects(ctx.hand, { oldField: oldMyField, newField: ctx.field });
  });
};