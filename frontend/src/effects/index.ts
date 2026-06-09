import type { Card } from '../../../shared/types';
import { aoeDamageEffect, selectDamageEffect } from './damage/damage';
import { selectDestroyEffect } from './destory/destroy';

export interface SelectDamageEffect {
  type: 'SelectDamage';
  value: number;
}

export interface AoEDamageEffect {
  type: 'AoEDamage';
  value: number;
}

export interface SelectDestroyEffect {
  type: 'SelectDestroy';
}

export interface BuffEffect {
  type: 'Buff';
  attack: number;
  defense: number;
}

export type CardEffect = 
  | SelectDamageEffect 
  | AoEDamageEffect 
  | SelectDestroyEffect 
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

    case 'SelectDestroy':
      return selectDestroyEffect.execute(context, targetIndex);

    case 'Buff':
      return {};

    default:
      return {};
  }
};