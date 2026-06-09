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

export interface CardEffect {
  execute(context: EffectContext, value: number, targetIndex?: number): EffectResult;
}