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

export const comboMyStatsBufEffect: CardEffect = {
  execute(context: EffectContext, values?:EfectValues, targetIndex?: number, selfInstanceId?: string): EffectResult {
    const bufAttack = context.turnLog.oneTurnPlayCount ?? 0;
    const bufDefense = 0;

    const updatedMyField = context.field.map(follower => {
      if (follower.instanceId === selfInstanceId) {
        return {
          ...follower,
          attack: follower.attack + bufAttack,
          defense: follower.defense + bufDefense
        };
      }
      return follower;
    });
    
    return {
      myField: updatedMyField
    };
  }
};