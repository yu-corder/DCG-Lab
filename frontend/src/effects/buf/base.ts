import type { Card, EfectValues, TurnActionLog } from '../../../../shared/types';

export interface EffectContext {
  field: Card[];
  enemyField: Card[];
  hand: Card[];
  deck: Card[];
  token: Card[];
  turnLog: TurnActionLog;
}

export interface EffectResult {
  myField?: Card[];
  enemyField?: Card[];
  hand?: Card[];
  deck?: Card[];
}

export interface CardEffect {
  execute(context: EffectContext, values?: EfectValues, targetIndex?: number, selfInstanceId?: string): EffectResult;
}