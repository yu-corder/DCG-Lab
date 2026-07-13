import type { GameContext } from '../../../../shared/game';

export const executeApplyEvolution = (ctx: GameContext, targetInstanceId: string) => {
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