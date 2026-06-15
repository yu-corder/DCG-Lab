// frontend/src/effects/destroy/base.ts
import type { Card } from '../../../../shared/types';

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
  execute(context: EffectContext, value: number): EffectResult;
}