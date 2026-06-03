import type { CardEffect } from './base';
import { aoeDamageEffect } from './aoeDamage';

export const EffectRegistry: Record<string, CardEffect> = {
  AoeDamage: aoeDamageEffect,
};