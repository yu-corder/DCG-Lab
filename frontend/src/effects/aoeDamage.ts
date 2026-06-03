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