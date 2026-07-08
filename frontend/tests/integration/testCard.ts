import type { Card } from '../../../shared/types';

export const dummySpell: Card = {
    id: 9999,
    instanceId: "insect-notice-instance-id",
    name: '虫の知らせ',
    cost: 0,
    type: 'Spell',
    subtypes: [],
    attack: 0,
    defense: 0,
    baseAttack: 0,
    baseDefense: 0,
    abilities: [
    　  {
            trigger: 'Fanfare',
            effectType: 'SelectBounce',
            values: {},
            description: '自分の場のカード1枚を選ぶ。それを手札に戻す。'
        },
        { 
            trigger: 'Fanfare',
            effectType: 'RandomDamage',
            values: {value1: 2, value2: 1,},
            description: '自分の場のカード1枚を選ぶ。それを手札に戻す。相手の場のフォロワーからランダム1枚に2ダメージ。' 
        }
    ],
    hasAttacked: false,
    isEvolved: false,
    playedThisTurn: false,
    isExEvolved: false,
};