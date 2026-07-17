import type { Crest } from '../shared/types';

export const allCrests: Crest[] = [
  {
    id: 1,
    name: "自然の妖精姫・アリア",
    abilities: [
      { 
        trigger: 'Fanfare',
        effectType: 'SelectStatsFix',
        values: { fixedDefense: 1 },
        conditionType: 'PlayCondition',
        triggerConditions: 'HAS_MATCHING_CONBO',
        conditionValue: 3,
        description: 'ファンファーレ コンボ_3 相手の場のフォロワー1枚を選ぶ。それは体力1になる。' 
      }
    ]
  }
];