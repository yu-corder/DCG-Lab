import type { EffectContext, EffectResult, CardEffect } from './types';
import type { EfectValues } from "../../../shared/types";

export const DrawEffect: CardEffect = {
  execute(context: EffectContext, values: EfectValues): EffectResult {
    const drawCount = values.value1 ?? 1;
    const actualDrawCount = Math.min(drawCount, context.deck.length);

    const drawnCards = context.deck.slice(0, actualDrawCount);
    const remainingDeck = context.deck.slice(actualDrawCount);
    const newHand = [...context.hand, ...drawnCards];

    return {
      deck: remainingDeck,
      hand: newHand
    };
  }
};