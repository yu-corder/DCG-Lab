import type { Card } from '../../../shared/types';

export interface TargetingContext {
  card: Card;
  effectType: 'SelectDamage' | 'SelectBuff' | 'SelectDestroy';
  value: number;
}