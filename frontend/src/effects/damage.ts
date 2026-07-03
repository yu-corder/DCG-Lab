import type { EffectContext, EffectResult, CardEffect } from './types';
import type { EfectValues } from "../../../shared/types";

const resolveDynamicValue = (sourceType: string | undefined, context: EffectContext, values?: EfectValues): number => {
  if (!sourceType) return 0;

  switch (sourceType) {
    case 'HandLength':
      return context.hand.length;

    case 'HandCardCountWithSubtype':
      const targetSubtype = values?.targetSubtype ?? 'Fairy';
      return context.hand.filter(card => card.subtypes?.includes(targetSubtype)).length;

    default:
      console.warn(`Unknown dynamic value source: ${sourceType}`);
      return 0;
  }
};

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

export const splitDamageEffect: CardEffect = {
  execute(context: EffectContext, values: EfectValues, targetIndex?: number): EffectResult {
    let currentDamage = resolveDynamicValue(values.damageSourse, context, values);

    const updatedField = context.enemyField.map((follower) => {
      if (currentDamage <= 0) return follower;

      const damageToApply = Math.min(currentDamage, follower.defense);
      currentDamage -= damageToApply;
      return {
        ...follower,
        defense: follower.defense - damageToApply
      };
    }).filter(follower => follower.defense > 0);

    return { enemyField: updatedField };
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

export const randomDamageEffect: CardEffect = {
  execute(context: EffectContext, values: EfectValues, targetIndex?: number): EffectResult {

    const damageCount = values.damageCount ? resolveDynamicValue(values.damageCount, context, values) : values.value2;
    const damage = values.value1;
    const updatedEnemyField = [...context.enemyField];
    
    for (let i:number = 0; i < damageCount; i++) {
      if (updatedEnemyField.length === 0) break;
      let random = Math.floor(Math.random() * updatedEnemyField.length);
      
      const targetFollower = updatedEnemyField[random];
      targetFollower.defense -= damage;

      if (targetFollower.defense <= 0) {
        updatedEnemyField.splice(random, 1);
      }
    }

    return { enemyField: updatedEnemyField };
  }
};