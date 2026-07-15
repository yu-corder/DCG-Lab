import type { EfectValues } from '../../../shared/types';
import type { EffectContext, EffectResult, CardEffect } from './types';

import { myFieldAllBufEffect, statsBufEffect, statsFixEffect } from './buf';
import { aoeDamageEffect, selectDamageEffect, splitDamageEffect, randomDamageEffect } from './damage';
import { selectDestroyEffect } from './destroy';
import { DrawEffect } from './draw';
import { MyHealthHealEffect } from './heal';
import { getTokenEffect } from './token';
import { selectBounceEffect } from './bounce';
import { selfDestroyEffect } from './destroy';

const effectRegistry: Record<string, CardEffect> = {
  SelectDamage: selectDamageEffect,
  AoeDamage: aoeDamageEffect,
  SelectDestroy: selectDestroyEffect,
  Draw: DrawEffect,
  MyHealthHeal: MyHealthHealEffect,
  GetToken: getTokenEffect,
  MyFieldAllBuf: myFieldAllBufEffect,
  StatsBuf: statsBufEffect,
  SelectStatsFix: statsFixEffect,
  SelectBounce: selectBounceEffect,
  SplitDamage: splitDamageEffect,
  RandomDamage: randomDamageEffect,
  SelfDestroy: selfDestroyEffect,
};

export const executeGameEffect = (
  effectType: string,
  values: EfectValues,
  context: EffectContext,
  targetIndex?: number,
  selfInstanceId?: string
): EffectResult => {
  const effect = effectRegistry[effectType];
  
  if (!effect) {
    console.warn(`Unknown effect type: ${effectType}`);
    return {};
  }

  return effect.execute(context, values, targetIndex, selfInstanceId);
};