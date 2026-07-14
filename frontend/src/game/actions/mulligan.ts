import type { GameContext } from '../../../../shared/game';
import type { Card } from '../../../../shared/types';
import { shuffle } from '../utils/cardUtils';
import { executeDrawCard } from './drawCard';

export const executeMulligan = (
  ctx: GameContext,
  selectCards: Card[],
  onDefeat: () => void
) => {
  const count = selectCards.length;
  const newDrawnCards = ctx.deck.slice(0, count);
  const remainingDeck = ctx.deck.slice(count);

  ctx.hand = ctx.hand
    .filter(h => !selectCards.some(s => s.instanceId === h.instanceId))
    .concat(newDrawnCards);

  ctx.deck = shuffle([...remainingDeck, ...selectCards]);

  executeDrawCard(ctx, onDefeat);
};