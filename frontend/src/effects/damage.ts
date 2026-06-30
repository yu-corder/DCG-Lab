import type { EffectContext, EffectResult, CardEffect } from './types';
import type { EfectValues } from "../../../shared/types";

export const aoeDamageEffect: CardEffect = {
  execute(context: EffectContext, values: EfectValues): EffectResult {
    const damage = values.value1 ?? 0; 

    const updatedEnemyField = context.enemyField
      .map(follower => ({
        ...follower,
        defense: follower.defense - damage
      }))
      .filter(follower => follower.defense > 0);
    
    return {
      enemyField: updatedEnemyField
    };
  }
};

export const selectDamageEffect: CardEffect = {
  execute(context: EffectContext, values: EfectValues, targetIndex?: number): EffectResult {
    if (targetIndex === undefined) return {};
    
    const damage = values.value1 ?? 0;

    const updatedEnemyField = context.enemyField
      .map((follower, index) => {
        if (index !== targetIndex) return follower;
        return { ...follower, defense: follower.defense - damage };
      })
      .filter(follower => follower.defense > 0);

    return { enemyField: updatedEnemyField };
  }
};