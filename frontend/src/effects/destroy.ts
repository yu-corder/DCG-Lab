import type { EfectValues } from '../../../shared/types';
import type { EffectContext, EffectResult, CardEffect } from './types';

export const selectDestroyEffect: CardEffect = {
  execute(context: EffectContext, values?: EfectValues, targetIndex?: number, selfInstanceId?: string): EffectResult {
    if (targetIndex === undefined) return {};
    const updatedEnemyField = context.enemyField.filter((_, index) => index !== targetIndex);

    return {
      enemyField: updatedEnemyField
    };
  }
};