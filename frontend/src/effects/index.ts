import type { CardEffect } from './base';
import { aoeDamageEffect, selectDamageEffect } from './damage';

export const EffectRegistry: Record<string, CardEffect> = {
  AoeDamage: aoeDamageEffect,
  SelectDamage: selectDamageEffect,
};