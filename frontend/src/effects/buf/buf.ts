import type { CardEffect, EffectContext, EffectResult } from "./base";
import type { EfectValues } from "../../../../shared/types";

export const myFieldAllBufEffect: CardEffect = {
  execute(context: EffectContext, values: EfectValues): EffectResult {
    const bufAttack = values.attack ?? 0;
    const bufDefense = values.defense ?? 0;

    const updatedMyField = context.field
      .map(follower => ({
        ...follower,
        defense: follower.defense + bufDefense,
        attack: follower.attack + bufAttack
      }))
      .filter(follower => follower.defense > 0);
    
    return {
      myField: updatedMyField
    };
  }
};