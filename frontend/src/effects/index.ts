import type { CardEffect } from './damage/base';
import { aoeDamageEffect, selectDamageEffect } from './damage/damage';
import { selectDestroyEffect } from './destory/destroy';

export const EffectRegistry: Record<string, CardEffect> = {
  AoeDamage: aoeDamageEffect,
  SelectDamage: selectDamageEffect,
  SelectDestroy: selectDestroyEffect,
};