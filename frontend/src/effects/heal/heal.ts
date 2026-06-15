import type { HealEffectProcessor, EffectContext, EffectResult } from "./base";

export const MyHealthHealEffect: HealEffectProcessor = {
  execute(context: EffectContext, value: number): EffectResult {
    const myHealth = context.myHealth + value > 20 ? 20 : context.myHealth + value;

    return {
      myHealth: myHealth
    };
  }
};