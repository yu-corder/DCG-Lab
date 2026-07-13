import type { GameContext } from '../../../../shared/game';
import { resolveTriggerEffects } from '../../hooks/utils/triggerEffects';

export const executeEndTurn = (
  ctx: GameContext, 
  drawCardCtxFn: (ctx: GameContext) => void,
  mergeFn: (ctx: GameContext, result: any) => void
) => {
  const resetField = ctx.field.map(card => ({
    ...card,
    hasAttacked: false,
    playedThisTurn: false
  }));
  ctx.field = resetField;

  const turnEndResult = resolveTriggerEffects(resetField, ctx, 'TurnEnd');
  mergeFn(ctx, turnEndResult);

  ctx.turn += 1;
  ctx.maxPP = Math.min(ctx.maxPP + 1, 10);
  ctx.pp = ctx.maxPP;
  ctx.turnLog.oneTurnPlayCount = 0;
  ctx.hasEvolvedThisTurn = false;

  drawCardCtxFn(ctx);
};