import type { Card } from '../../../shared/types';
import { aoeDamageEffect, selectDamageEffect } from './damage/damage';

export interface SelectDamageEffect {
  type: 'SelectDamage';
  value: number;
}

export interface AoEDamageEffect {
  type: 'AoEDamage';
  value: number;
}

export interface DestroyEffect {
  type: 'Destroy';
}

export interface BuffEffect {
  type: 'Buff';
  attack: number;
  defense: number;
}

export type CardEffect = 
  | SelectDamageEffect 
  | AoEDamageEffect 
  | DestroyEffect 
  | BuffEffect;

export interface EffectContext {
  field: Card[];
  enemyField: Card[];
  hand: Card[];
  deck: Card[];
}

export interface EffectResult {
  myField?: Card[];
  enemyField?: Card[];
  hand?: Card[];
  deck?: Card[];
}

export const applyCardEffect = (
  context: EffectContext, 
  effect: CardEffect, 
  targetIndex?: number
): EffectResult => {
  switch (effect.type) {
    case 'SelectDamage':
      return selectDamageEffect.execute(context, effect.value, targetIndex);

    case 'AoEDamage':
      return aoeDamageEffect.execute(context, effect.value);

    case 'Destroy':
      return {};

    case 'Buff':
      return {};

    default:
      return {};
  }
};