import type { CardEffect, EffectContext, EffectResult } from "./base";
import type { EfectValues } from "../../../../shared/types";

export const getTokenEffect: CardEffect = {
  execute(context: EffectContext, values: EfectValues): EffectResult {
    const tokens = context.token;
    let currentHand = context.hand;
    const size = values.value1 ?? 0;
    const tokenId = values.value2 ?? 1;
    const targetToken = tokens.find(t => t.id === tokenId);

    if (!targetToken) {
      return { hand: currentHand };
    }

    for (let i:number = 0; i < size; i++) {
        currentHand = [...currentHand, { 
          ...targetToken, 
          instanceId: crypto.randomUUID()
        }];
    }

    return {
      hand: currentHand
    };
  }
};