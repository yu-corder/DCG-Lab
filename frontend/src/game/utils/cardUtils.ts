import type { Card } from '../../../../shared/types';

export const cloneCards = (cards: Card[]): Card[] => {
  return cards.map(card => ({ ...card }));
};