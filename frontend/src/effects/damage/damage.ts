import type { CardEffect, EffectContext, EffectResult } from "./base";

export const aoeDamageEffect: CardEffect = {
    execute(context: EffectContext, value: number): EffectResult {
        const updatedEnemyField = context.enemyField
          .map(followr => ({
            ...followr,
            defense: followr.defense - value
          }))
          .filter(follower => follower.defense > 0);
        
        return {
            enemyField: updatedEnemyField
        };
    }
};

export const selectDamageEffect: CardEffect = {
  execute(context: EffectContext, value: number, targetIndex?: number): EffectResult {
    if (targetIndex === undefined) return {};

    const updatedEnemyField = context.enemyField
      .map((follower, index) => {
        if (index !== targetIndex) return follower;
        return { ...follower, defense: follower.defense - value };
      })
      .filter(follower => follower.defense > 0);

    return { enemyField: updatedEnemyField };
  }
};