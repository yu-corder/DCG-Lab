// frontend/src/effects/destroy/base.ts
import type { Card, EfectValues } from '../../../../shared/types';

export interface EffectContext {
  field: Card[];
  enemyField: Card[];
  hand: Card[];
  deck: Card[];
  myHealth: number;
  enemyHealth: number;
}

export interface EffectResult {
  myField?: Card[];
  enemyField?: Card[];
  hand?: Card[];
  deck?: Card[];
  myHealth?: number;
  enemyHealth?: number;
}

export interface HealEffectProcessor {
  execute(context: EffectContext, values: EfectValues): EffectResult;
}