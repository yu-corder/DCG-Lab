import type { Card } from '../../../../shared/types';

export const cloneCards = (cards: Card[]): Card[] => {
  return cards.map(card => ({ ...card }));
};

export function shuffle<T>(array: T[]): T[] {
  const out = Array.from(array);
  for (let i = out.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    const tmp = out[i];
    out[i] = out[r];
    out[r] = tmp;
  }
  return out;
}

export const assignInstanceIds = (cards: any[]): any[] => {
  return cards.map(card => ({
    ...card,
    instanceId: card.instanceId || crypto.randomUUID()
  }));
};