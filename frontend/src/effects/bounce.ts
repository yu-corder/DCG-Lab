import type { EfectValues } from '../../../shared/types';
import type { EffectContext, EffectResult, CardEffect } from './types';

export const selectBounceEffect: CardEffect = {
  execute(context: EffectContext, values?: EfectValues, targetIndex?: number, selfInstanceId?: string): EffectResult {
    if (targetIndex === undefined || targetIndex < 0 || targetIndex >= context.field.length) {
      return {};
    }
    const targetCard = context.field[targetIndex];
    const updatedField = context.field.filter((_, index) => index !== targetIndex);
    const updatedHand = [...context.hand, targetCard];

    return {
      myField: updatedField,
      hand: updatedHand
    };
  }
};