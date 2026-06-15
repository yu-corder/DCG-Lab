import type { Card } from '../../../shared/types';

export interface ConditionContext {
  field: Card[];
  enemyField: Card[];
  hand: Card[];
  deck: Card[];
}

export interface ConditionResult {
  condition: boolean;
}

export interface Conditions {
  conditionDispatcher(context: ConditionContext, trigger: string, value?: number): ConditionResult;
}