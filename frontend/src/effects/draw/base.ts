// frontend/src/effects/destroy/base.ts
import type { Card, EfectValues } from '../../../../shared/types';

export interface EffectContext {
  field: Card[];
  enemyField: Card[];
  hand: Card[];
  deck: Card[];
  token: Card[];
}

export interface EffectResult {
  myField?: Card[];
  enemyField?: Card[];
  hand?: Card[];
  deck?: Card[];
}

export interface CardEffect {
  execute(context: EffectContext, values: EfectValues): EffectResult;
}