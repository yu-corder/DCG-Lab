import type { Card, Crest } from '../../../../shared/types';

export const cloneCards = (cards: Card[]): Card[] => {
  return cards.map(card => ({ ...card }));
};

export const cloneCrest = (crests: Crest[]): Crest[] => {
  return crests.map(crest => ({...crest}));
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