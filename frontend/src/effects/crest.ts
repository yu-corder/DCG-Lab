import type { EffectContext, EffectResult, CardEffect } from './types';
import type { EfectValues } from "../../../shared/types";

export const setCrestEffect: CardEffect = {
  execute(context: EffectContext, values: EfectValues): EffectResult {
    const crestId = values.value1;
    const crest = context.crest;
    const targetCrest = crest.find(t => t.id === crestId);
    const updateMyCrest = [...context.myCrest, { 
        ...targetCrest, 
    }];
 

    return {
        myCrest: updateMyCrest
    };
  }
};