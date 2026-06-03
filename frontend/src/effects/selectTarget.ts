export interface TargetingContext {
  sourceCardId: string;
  effectType: 'SelectDamage' | 'SelectBuff';
  value: number;
}