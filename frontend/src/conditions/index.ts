import type { Card, TurnActionLog } from '../../../shared/types';
import { checkFieldCondition } from './field';
import { checkPlayCondition } from './play';

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

export interface HasMatchingConboCondition {
  type: 'PlayCondition';
  subType: 'HAS_MATCHING_CONBO';
  value: number;
}

export type CardCondition = HasEvolvedFollowerCondition | HasMatchingCostFollowerCondition | HasMatchingConboCondition;

export interface ConditionContext {
  field: Card[];
  enemyField: Card[];
  hand: Card[];
  deck: Card[];
  turnLog: TurnActionLog;
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

    case 'PlayCondition': 
      return checkPlayCondition(context, condition);

    default:
      return {condition: true};
  }
};