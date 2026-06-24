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