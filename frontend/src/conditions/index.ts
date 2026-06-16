import type { Card } from '../../../shared/types';
import { checkFieldCondition } from './field/field';

export interface HasEvolvedFollowerCondition {
  type: 'FieldCondition';
  subType: 'HAS_EVOLED_FOLLOWER';
  value?: number;
}

export interface HasMatchingCostFollowerCondition {
  type: 'FieldCondition';
  subType: 'HAS_MATCHING_COST_FOLLOWER';
  value: number;
}

export type CardCondition = HasEvolvedFollowerCondition | HasMatchingCostFollowerCondition;

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
  condition: CardCondition
): ConditionResult => {
  switch (condition.type) {
    case 'FieldCondition':
      return checkFieldCondition(context, condition);
    default:
      return {condition: true};
  }
};