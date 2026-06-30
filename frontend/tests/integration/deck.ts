import type { Card } from '../../../shared/types';
export const testDeck_1: Card[] = [
    {
      id: 1,
      name: 'アドベンチャーエルフ・メイ',
      cost: 1,
      type: 'Follower',
      attack: 1,
      defense: 1,
      abilities: [
        {
          trigger: 'Fanfare',
          conditionType: 'PlayCondition',
          triggerConditions: 'HAS_MATCHING_CONBO',
          conditionValue: 3,
          effectType: 'SelectDamage',
          values: { value1: 3 },
          description: 'ファンファーレ コンボ_3 相手の場のフォロワー1体を選ぶ。それに3ダメージ。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 2,
      name: 'アドベンチャーエルフ・メイ',
      cost: 1,
      type: 'Follower',
      attack: 1,
      defense: 1,
      abilities: [
        {
          trigger: 'Fanfare',
          conditionType: 'PlayCondition',
          triggerConditions: 'HAS_MATCHING_CONBO',
          conditionValue: 3,
          effectType: 'SelectDamage',
          values: { value1: 3 },
          description: 'ファンファーレ コンボ_3 相手の場のフォロワー1体を選ぶ。それに3ダメージ。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 3,
      name: 'アドベンチャーエルフ・メイ',
      cost: 1,
      type: 'Follower',
      attack: 1,
      defense: 1,
      abilities: [
        {
          trigger: 'Fanfare',
          conditionType: 'PlayCondition',
          triggerConditions: 'HAS_MATCHING_CONBO',
          conditionValue: 3,
          effectType: 'SelectDamage',
          values: { value1: 3 },
          description: 'ファンファーレ コンボ_3 相手の場のフォロワー1体を選ぶ。それに3ダメージ。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },

    {
      id: 4,
      name: '純粋なるウォーターフェアリー',
      cost: 1,
      type: 'Follower',
      attack: 1,
      defense: 1,
      abilities: [
        { trigger: 'LastWord', description: 'ラストワード フェアリー1枚を自分の手札に加える。' }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 5,
      name: '純粋なるウォーターフェアリー',
      cost: 1,
      type: 'Follower',
      attack: 1,
      defense: 1,
      abilities: [
        { trigger: 'LastWord', description: 'ラストワード フェアリー1枚を自分の手札に加える。' }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 6,
      name: '純粋なるウォーターフェアリー',
      cost: 1,
      type: 'Follower',
      attack: 1,
      defense: 1,
      abilities: [
        { trigger: 'LastWord', description: 'ラストワード フェアリー1枚を自分の手札に加える。' }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 13,
      name: '楽朗の天宮・フィルドア',
      cost: 1,
      type: 'Follower',
      attack: 2,
      defense: 2,
      abilities: [
        {
          trigger: 'Evolve',
          effectType: 'SelectDestroy',
          values: {},
          description: '進化時 相手の場のフォロワー1枚を選ぶ。それを破壊。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 14,
      name: '楽朗の天宮・フィルドア',
      cost: 1,
      type: 'Follower',
      attack: 2,
      defense: 2,
      abilities: [
        {
          trigger: 'Evolve',
          effectType: 'SelectDestroy',
          values: {},
          description: '進化時 相手の場のフォロワー1枚を選ぶ。それを破壊。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 15,
      name: '楽朗の天宮・フィルドア',
      cost: 1,
      type: 'Follower',
      attack: 2,
      defense: 2,
      abilities: [
        {
          trigger: 'Evolve',
          effectType: 'SelectDestroy',
          values: {},
          description: '進化時 相手の場のフォロワー1枚を選ぶ。それを破壊。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
];

export const testDeck_2: Card[] = Array(40).fill(null).map((_, index) => ({
  id: 100 + index,
  name: '全体火力のテストフォロワー',
  cost: 1,
  type: 'Follower',
  attack: 2,
  defense: 2,
  abilities: [
    {
        trigger: 'Fanfare',
        effectType: 'AoeDamage',
        values: { value1: 1 },
        description: 'ファンファーレ 相手の場のフォロワーすべてに1ダメージ。'
    }
  ],
  hasAttacked: false,
  isEvolved: false,
  playedThisTurn: false,
  isExEvolved: false,
}));

export const testDeck_3: Card[] = Array(40).fill(null).map((_, index) => ({
  id: 200 + index,
  name: '選択火力のテストフォロワー',
  cost: 1,
  type: 'Follower',
  attack: 2,
  defense: 2,
  abilities: [
    {
      trigger: 'Fanfare',
      effectType: 'SelectDamage',
      values: { value1: 2 },
      description: 'ファンファーレ 相手の場のフォロワー1体を選ぶ。それに2ダメージ。'
    }
  ],
  hasAttacked: false,
  isEvolved: false,
  playedThisTurn: false,
  isExEvolved: false,
}));

export const testDeck_4: Card[] = Array(40).fill(null).map((_, index) => ({
  id: 300 + index,
  name: '確定除去のテストフォロワー',
  cost: 1,
  type: 'Follower',
  attack: 2,
  defense: 5,
  abilities: [
    {
      trigger: 'Fanfare',
      effectType: 'SelectDestroy',
      description: 'ファンファーレ 相手の場のフォロワー1体を選ぶ。それを破壊する。'
    }
  ],
  hasAttacked: false,
  isEvolved: false,
  playedThisTurn: false,
  isExEvolved: false,
}));

export const testDeck_5: Card[] = Array(40).fill(null).map((_, index) => ({
  id: 400 + index,
  name: '知恵のテストフォロワー',
  cost: 1,
  type: 'Follower',
  attack: 1,
  defense: 1,
  abilities: [
    {
      trigger: 'Fanfare',
      effectType: 'Draw',
      values: { value1: 3 },
      description: 'ファンファーレ カードを2枚引く。'
    }
  ],
  hasAttacked: false,
  isEvolved: false,
  playedThisTurn: false,
  isExEvolved: false,
}));

export const testDeck_6: Card[] = Array(40).fill(null).map((_, index) => ({
  id: 500 + index,
  name: '癒やしのテストフォロワー',
  cost: 1,
  type: 'Follower',
  attack: 1,
  defense: 1,
  abilities: [
    {
      trigger: 'Fanfare',
      effectType: 'MyHealthHeal',
      values: { value1: 4 },
      description: 'ファンファーレ 自分のリーダーの体力を3回復する。'
    }
  ],
  hasAttacked: false,
  isEvolved: false,
  playedThisTurn: false,
  isExEvolved: false,
}));

export const testDeck_7: Card[] = Array(40).fill(null).map((_, index) => ({
  id: 600 + index,
  name: 'フェアリーテイマー',
  cost: 1,
  type: 'Follower',
  attack: 2,
  defense: 2,
  abilities: [
    {
      trigger: 'Fanfare',
      effectType: 'GetToken',
      values: { value1: 2, value2: 1 },
      description: 'ファンファーレ フェアリー2枚を自分の手札に加える。'
    }
  ],
  hasAttacked: false,
  isEvolved: false,
  playedThisTurn: false,
  isExEvolved: false,
}));

export const testDeck_8: Card[] = Array(40).fill(null).map((_, index) => ({
  id: 700 + index,
  name: '進化のテストフォロワー',
  cost: 1,
  type: 'Follower',
  attack: 1,
  defense: 1,
  abilities: [
    {
      trigger: 'Evolve',
      effectType: 'Draw',
      values: { value1: 1 },
      description: '進化時 カードを1枚引く。'
    }
  ],
  hasAttacked: false,
  isEvolved: false,
  playedThisTurn: false,
  isExEvolved: false,
}));

export const testDeck_9: Card[] = Array(40).fill(null).map((_, index) => ({
  id: 800 + index,
  name: '戦闘のテストフォロワー',
  cost: 1,
  type: 'Follower',
  attack: 1,
  defense: 2,
  abilities: [],
  hasAttacked: true,
  isEvolved: false,
  playedThisTurn: false,
  isExEvolved: false,
}));

export const testDeck_10: Card[] = Array(40).fill(null).map((_, index) => ({
  id: 900 + index,
  name: '進化時ドローテストフォロワー',
  cost: 1,
  type: 'Follower',
  attack: 1,
  defense: 1,
  abilities: [
    {
      trigger: 'Evolve',
      effectType: 'Draw',
      values: { value1: 2 },
      description: '進化時 カードを2枚引く。'
    }
  ],
  hasAttacked: false,
  isEvolved: false,
  playedThisTurn: false,
  isExEvolved: false,
}));

export const testDeck_11: Card[] = Array(40).fill(null).map((_, index) => ({
  id: 1000 + index,
  name: '進化AoEテスト',
  cost: 1,
  type: 'Follower',
  attack: 1,
  defense: 2,
  abilities: [
    {
      trigger: 'Evolve',
      effectType: 'AoeDamage',
      values: { value1: 1 },
      description: '進化時 相手のフォロワーすべてに1ダメージ。'
    }
  ],
  hasAttacked: false,
  isEvolved: false,
  playedThisTurn: false,
  isExEvolved: false,
}));

export const testDeck_12: Card[] = Array(40).fill(null).map((_, index) => ({
  id: 1100 + index,
  name: '進化単体除去テスト',
  cost: 1,
  type: 'Follower',
  attack: 1,
  defense: 2,
  abilities: [
    {
      trigger: 'Evolve',
      effectType: 'SelectDamage',
      values: { value1: 4 },
      description: '進化時 相手のフォロワー1体を選択して4ダメージ。'
    }
  ],
  hasAttacked: false,
  isEvolved: false,
  playedThisTurn: false,
  isExEvolved: false,
}));

export const testDeck_13: Card[] = Array(40).fill(null).map((_, index) => ({
  id: 1200 + index,
  name: '進化確定破壊テスト',
  cost: 1,
  type: 'Follower',
  attack: 1,
  defense: 2,
  abilities: [
    {
      trigger: 'Evolve',
      effectType: 'SelectDestroy',
      values: {},
      description: '進化時 相手のフォロワー1体を選択して破壊する。'
    }
  ],
  hasAttacked: false,
  isEvolved: false,
  playedThisTurn: false,
  isExEvolved: false,
}));

export const testDeck_14: Card[] = Array(40).fill(null).map((_, index) => ({
  id: 1300 + index,
  name: '進化回復テスト',
  cost: 1,
  type: 'Follower',
  attack: 1,
  defense: 2,
  abilities: [
    {
      trigger: 'Evolve',
      effectType: 'MyHealthHeal',
      values: { value1: 3 },
      description: '進化時 自分のリーダーを3回復。'
    }
  ],
  hasAttacked: false,
  isEvolved: false,
  playedThisTurn: false,
  isExEvolved: false,
}));

export const testDeck_15: Card[] = Array(40).fill(null).map((_, index) => ({
  id: 1400 + index,
  name: '進化トークンテスト',
  cost: 1,
  type: 'Follower',
  attack: 1,
  defense: 2,
  abilities: [
    {
      trigger: 'Evolve',
      effectType: 'GetToken',
      values: { value1: 2, value2: 1 },
      description: '進化時 フェアリー2枚を手札に加える。'
    }
  ],
  hasAttacked: false,
  isEvolved: false,
  playedThisTurn: false,
  isExEvolved: false,
}));

export const testDeck_16: Card[] = Array(40).fill(null).map((_, index) => ({
  id: 1500 + index,
  name: 'コンボドローテストフォロワー',
  cost: 1,
  type: 'Follower',
  attack: 1,
  defense: 1,
  abilities: [
    {
      trigger: 'Fanfare',
      effectType: 'Draw',
      values: { value1: 2 },
      conditionType: 'PlayCondition', 
      triggerConditions: 'HAS_MATCHING_CONBO', 
      conditionValue: 2,
      description: '【コンボ_2】ファンファーレ カードを2枚引く。'
    }
  ],
  hasAttacked: false,
  isEvolved: false,
  playedThisTurn: false,
  isExEvolved: false,
}));

export const testDeck_17: Card[] = Array(40).fill(null).map((_, index) => ({
  id: 1600 + index,
  name: '進化参照AoEテストフォロワー',
  cost: 1,
  type: 'Follower',
  attack: 1,
  defense: 2,
  abilities: [
    {
      trigger: 'Fanfare',
      effectType: 'AoeDamage',
      values: { value1: 1 },
      conditionType: 'FieldCondition', 
      triggerConditions: 'HAS_EVOLED_FOLLOWER', 
      conditionValue: 0,
      description: 'ファンファーレ 自分の場に進化フォロワーがいるなら、相手のフォロワーすべてに1ダメージ。'
    }
  ],
  hasAttacked: false,
  isEvolved: false,
  playedThisTurn: false,
  isExEvolved: false,
}));

export const testDeck_18: Card[] = Array(40).fill(null).map((_, index) => ({
  id: 1700 + index,
  name: 'コスト参照回復テストフォロワー',
  cost: 1,
  type: 'Follower',
  attack: 1,
  defense: 1,
  abilities: [
    {
      trigger: 'Fanfare',
      effectType: 'MyHealthHeal',
      values: { value1: 3 },
      conditionType: 'FieldCondition', 
      triggerConditions: 'HAS_MATCHING_COST_FOLLOWER', 
      conditionValue: 1,
      description: 'ファンファーレ 場にコスト1のフォロワーがいるなら、自分のリーダーを3回復。'
    }
  ],
  hasAttacked: false,
  isEvolved: false,
  playedThisTurn: false,
  isExEvolved: false,
}));

export const testDeck_19: Card[] = Array(40).fill(null).map((_, index) => ({
  id: 1700 + index,
  name: ' コンボ数自己バフフォロワー',
  cost: 1,
  type: 'Follower',
  attack: 0,
  defense: 1,
  abilities: [
    { 
      trigger: 'Fanfare',
      effectType: 'StatsBuf',
      values: { attackSource: 'CurrentCombo' },
      description: 'ファンファーレ これは+X/+0する。Xは自分のコンボである。',
      abilityType: 'SHISSOU'
    }
  ],
  hasAttacked: false,
  isEvolved: false,
  playedThisTurn: false,
  isExEvolved: false,
}));

export const testDeck_20: Card[] = Array(40).fill(null).map((_, index) => ({
  id: 1800 + index,
  name: 'テスト用スペルカード',
  cost: 1,
  type: 'Spell',
  attack: 0,
  defense: 0,
  abilities: [
    {
      trigger: 'Fanfare',
      effectType: 'GetToken',
      values: { value1: 2, value2: 1 },
      description: 'フェアリー2枚を自分の手札に加える。'
    }
  ],
  hasAttacked: false,
  isEvolved: false,
  playedThisTurn: false,
  isExEvolved: false,
}));

export const testDeck_21: Card[] = Array(40).fill(null).map((_, index) => ({
  id: 1900 + index,
  name: 'アマツ風・フェアリー自己バフフォロワー',
  cost: 1,
  type: 'Follower',
  subtypes: ['Fairy'],
  attack: 0,
  defense: 0,
  abilities: [
    {
      trigger: 'Fanfare',
      effectType: 'StatsBuf',
      values: { 
        attackSource: 'HandCardCountWithSubtype', 
        defenseSource: 'HandCardCountWithSubtype', 
        targetSubtype: 'Fairy' 
      },
      description: 'ファンファーレ これは+X/+Xする。Xは自分の手札のFairy・フォロワーの枚数である。',
    }
  ],
  hasAttacked: false,
  isEvolved: false,
  playedThisTurn: false,
  isExEvolved: false,
}));