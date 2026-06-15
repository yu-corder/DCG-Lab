import type { Card } from '../../../shared/types';
import { fieldCondition } from './field/field';

export interface FieldCondition {
  type: 'FieldCondition';
  trriger: 'HAS_EVOLED_FOLLOWER';
  value?: number;
}

export type Condition = 
  | FieldCondition;

export interface ConditionContext {
  field: Card[];
  enemyField: Card[];
  hand: Card[];
  deck: Card[];
}

export interface ConditionResult {
  condition: boolean;
}

export const conditionCheck = (
  context: ConditionContext, 
  condition: Condition, 
): ConditionResult => {
  switch (condition.type) {
    case 'FieldCondition':
      return fieldCondition.conditionDispatcher(context, condition.trriger);

    default:
      return;
  }
};