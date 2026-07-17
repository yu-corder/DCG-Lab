import type { Card, EfectValues, TurnActionLog, Crest } from '../../../shared/types';

export interface EffectContext {
  field: Card[];
  enemyField: Card[];
  hand: Card[];
  deck: Card[];
  token: Card[];
  turnLog: TurnActionLog;
  myHealth: number;
  enemyHealth: number;
  crest: Crest[];
  myCrest: Crest[];
  enemyCrest: Crest[];
}

export interface EffectResult {
  myField?: Card[];
  enemyField?: Card[];
  hand?: Card[];
  deck?: Card[];
  myHealth?: number;
  enemyHealth?: number;
  myCrest?: Crest[];
  enemyCrest?: Crest[];
}

export interface CardEffect {
  execute(
    context: EffectContext, 
    values?: EfectValues, 
    targetIndex?: number, 
    selfInstanceId?: string
  ): EffectResult;
}