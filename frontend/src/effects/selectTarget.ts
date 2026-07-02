import type { Card, EfectValues } from '../../../shared/types'; 

export interface TargetingContext {
  card: Card;
  effectType: 'SelectDamage' | 'SelectStatsFix' | 'SelectDestroy' | 'SelectBounce';
  values: EfectValues;
  targetTeam: 'my' | 'enemy' | 'both';
}