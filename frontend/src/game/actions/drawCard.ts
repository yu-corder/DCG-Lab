import type { GameContext } from '../../../../shared/game';

export const executeDrawCard = (
  ctx: GameContext,
  onDefeat: () => void
) => {
  if (ctx.deck.length === 0) {
    onDefeat();
    return;
  }
  const [firstCard, ...rest] = ctx.deck;
  if (ctx.hand.length < 10) {
    ctx.hand = [...ctx.hand, firstCard];
  }
  ctx.deck = rest;
};