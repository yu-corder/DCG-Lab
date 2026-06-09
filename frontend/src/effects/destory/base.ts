// frontend/src/effects/destroy/base.ts
import type { Card } from '../../../../shared/types';

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

export interface DestroyEffectProcessor {
  execute(context: EffectContext, targetIndex?: number): EffectResult;
}