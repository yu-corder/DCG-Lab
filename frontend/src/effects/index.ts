import type { Card, EfectValues } from '../../../shared/types';
import { aoeDamageEffect, selectDamageEffect } from './damage/damage';
import { selectDestroyEffect } from './destory/destroy';
import { DrawEffect } from './draw/draw';
import { MyHealthHealEffect } from './heal/heal';
import { getTokenEffect } from './token/token';
import { myFieldAllBufEffect } from './buf/buf';

export interface EffectContext {
  field: Card[];
  enemyField: Card[];
  hand: Card[];
  deck: Card[];
  myHealth: number;
  enemyHealth: number;
  token: Card[];
}

export interface EffectResult {
  myField?: Card[];
  enemyField?: Card[];
  hand?: Card[];
  deck?: Card[];
  myHealth?: number;
  enemyHealth?: number;
}

export const applyCardEffect = (
  effectType: string,
  values: EfectValues,
  context: EffectContext,
  targetIndex?: number
): EffectResult => {
  switch (effectType) {
    case 'SelectDamage':
      return selectDamageEffect.execute(context, values, targetIndex);

    case 'AoeDamage':
      return aoeDamageEffect.execute(context, values);

    case 'SelectDestroy':
      return selectDestroyEffect.execute(context, targetIndex);

    case 'Buff':
      return {};

    case 'Draw':
      return DrawEffect.execute(context, values);
    
    case 'MyHealthHeal':
      return MyHealthHealEffect.execute(context, values);

    case 'GetToken':
      return getTokenEffect.execute(context, values);

    case 'MyFieldAllBuf':
      return myFieldAllBufEffect.execute(context, values);

    default:
      return {};
  }
};