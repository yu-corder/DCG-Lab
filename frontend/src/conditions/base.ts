import type { Card, TurnActionLog } from '../../../shared/types';

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

export interface Conditions {
  conditionDispatcher(context: ConditionContext, trigger: string, value?: number): ConditionResult;
}