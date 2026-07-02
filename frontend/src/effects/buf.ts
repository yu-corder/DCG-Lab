import type { EffectContext, EffectResult, CardEffect } from './types';
import type { EfectValues } from "../../../shared/types";

const resolveDynamicValue = (sourceType: string | undefined, context: EffectContext, values?: EfectValues): number => {
  if (!sourceType) return 0;

  switch (sourceType) {
    case 'CurrentCombo':
      return context.turnLog.oneTurnPlayCount;
      
    case 'HandCardCountWithSubtype':
      const targetSubtype = values?.targetSubtype ?? 'Fairy';
      return context.hand.filter(card => card.subtypes?.includes(targetSubtype)).length;
      
    case 'HandLength':
      return context.hand.length;

    default:
      console.warn(`Unknown dynamic value source: ${sourceType}`);
      return 0;
  }
};

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

export const statsBufEffect: CardEffect = {
  execute(context: EffectContext, values?: EfectValues, targetIndex?: number, selfInstanceId?: string): EffectResult {
    const attackBuf = values?.attackSource 
      ? resolveDynamicValue(values.attackSource, context, values)
      : (values?.value1 ?? 0);

    const defenseBuf = values?.defenseSource
      ? resolveDynamicValue(values.defenseSource, context, values)
      : (values?.value2 ?? 0);

    const updatedField = context.field.map(card => {
      if (card.instanceId === selfInstanceId) {
        return {
          ...card,
          attack: (card.attack ?? 0) + attackBuf,
          defense: (card.defense ?? 0) + defenseBuf
        };
      }
      return card;
    });

    return {
      myField: updatedField
    };
  }
};

export const statsFixEffect: CardEffect = {
  execute(context: EffectContext, values?: EfectValues, targetIndex?: number, selfInstanceId?: string): EffectResult {
    const attackFix = values?.fixedAttack !== undefined ? values.fixedAttack : null;
    const defenseFix = values?.fixedDefense !== undefined ? values.fixedDefense : null;

    const updatedField = context.enemyField.map((card, index) => {
      if (index === targetIndex) {
        return {
          ...card,
          attack: attackFix === null ? card.attack : attackFix,
          defense: defenseFix === null ? card.defense : defenseFix,
        };
      }
      return card;
    });

    return {
      enemyField: updatedField
    };
  }
};