import type { DestroyEffectProcessor, EffectContext, EffectResult } from "./base";

export const selectDestroyEffect: DestroyEffectProcessor = {
  execute(context: EffectContext, targetIndex?: number): EffectResult {
    if (targetIndex === undefined) return {};
    const updatedEnemyField = context.enemyField.filter((_, index) => index !== targetIndex);

    return {
      enemyField: updatedEnemyField
    };
  }
};