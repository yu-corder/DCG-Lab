import type { HealEffectProcessor, EffectContext, EffectResult } from "./base";
import type { EfectValues } from "../../../../shared/types";

export const MyHealthHealEffect: HealEffectProcessor = {
  execute(context: EffectContext, values: EfectValues): EffectResult {
    const healAmount = values.value1 ?? 0;
    const updatedMyHealth = context.myHealth + healAmount > 20 
      ? 20 
      : context.myHealth + healAmount;

    return {
      myHealth: updatedMyHealth
    };
  }
};