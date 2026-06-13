import type { DrawEffectProcessor, EffectContext, EffectResult } from "./base";

export const DrawEffect: DrawEffectProcessor = {
  execute(context: EffectContext): EffectResult {
    const [firstCard, ...rest] = context.deck;
    const newHand = [...context.hand, firstCard];

    return {
      deck: rest,
      hand: newHand
    };
  }
};