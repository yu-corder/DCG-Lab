import type { Card } from '../shared/types';

export const albert: Card[] = [
    {
      id: 1,
      name: 'アドベンチャーエルフ・メイ',
      cost: 1,
      type: 'Follower',
      attack: 1,
      defense: 1,
      abilities: [
        {trigger: 'Fanfare',conditionType: 'PlayCondition', triggerConditions: 'HAS_MATCHING_CONBO', conditionValue: 3,  effectType: 'AoeDamage', values: {value1: 7}, description: 'コンボ_3 相手の場のフォロワー1体を選ぶ。それに3ダメージ'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 1,
      name: 'アドベンチャーエルフ・メイ',
      cost: 1,
      type: 'Follower',
      attack: 1,
      defense: 1,
      abilities: [
        {trigger: 'Fanfare',conditionType: 'PlayCondition', triggerConditions: 'HAS_MATCHING_CONBO', conditionValue: 3,  effectType: 'AoeDamage', values: {value1: 7}, description: 'コンボ_3 相手の場のフォロワー1体を選ぶ。それに3ダメージ'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 1,
      name: 'アドベンチャーエルフ・メイ',
      cost: 1,
      type: 'Follower',
      attack: 1,
      defense: 1,
      abilities: [
        {trigger: 'Fanfare',conditionType: 'PlayCondition', triggerConditions: 'HAS_MATCHING_CONBO', conditionValue: 3,  effectType: 'AoeDamage', values: {value1: 7}, description: 'コンボ_3 相手の場のフォロワー1体を選ぶ。それに3ダメージ'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 2,
      name: '純粋なるウォーターフェアリー',
      cost: 1,
      type: 'Follower',
      attack: 1,
      defense: 1,
      abilities: [
        {trigger: 'LastWord', description: 'ラストワード フェアリー1枚を自分の手札に加える'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 2,
      name: '純粋なるウォーターフェアリー',
      cost: 1,
      type: 'Follower',
      attack: 1,
      defense: 1,
      abilities: [
        {trigger: 'LastWord', description: 'ラストワード フェアリー1枚を自分の手札に加える'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 2,
      name: '純粋なるウォーターフェアリー',
      cost: 1,
      type: 'Follower',
      attack: 1,
      defense: 1,
      abilities: [
        {trigger: 'LastWord', description: 'ラストワード フェアリー1枚を自分の手札に加える'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 3,
      name: '虫の知らせ',
      cost: 1,
      type: 'Spell',
      abilities: [
        {trigger: 'Fanfare', description: '自分の場のカード1枚を選ぶ。それを手札に戻す。相手の場のフォロワーからランダム1枚に2ダメージ'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 3,
      name: '虫の知らせ',
      cost: 1,
      type: 'Spell',
      abilities: [
        {trigger: 'Fanfare', description: '自分の場のカード1枚を選ぶ。それを手札に戻す。相手の場のフォロワーからランダム1枚に2ダメージ'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 3,
      name: '虫の知らせ',
      cost: 1,
      type: 'Spell',
      abilities: [
        {trigger: 'Fanfare', description: '自分の場のカード1枚を選ぶ。それを手札に戻す。相手の場のフォロワーからランダム1枚に2ダメージ'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 4,
      name: '妖精の召集',
      cost: 1,
      type: 'Spell',
      abilities: [
        {trigger: 'Fanfare', description: 'フェアリー2枚を自分の手札に加える.'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 4,
      name: '妖精の召集',
      cost: 1,
      type: 'Spell',
      abilities: [
        {trigger: 'Fanfare', description: 'フェアリー2枚を自分の手札に加える.'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 4,
      name: '妖精の召集',
      cost: 1,
      type: 'Spell',
      abilities: [
        {trigger: 'Fanfare', description: 'フェアリー2枚を自分の手札に加える.'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 5,
      name: '楽朗の天宮・フィルドア',
      cost: 2,
      type: 'Follower',
      attack: 2,
      defense: 2,
      abilities: [
        {trigger: 'Evolve', effectType: 'SelectDestroy',description: '相手の場のフォロワー1枚を選ぶ。それを破壊。'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 6,
      name: 'フェアリーテイマー',
      cost: 2,
      type: 'Follower',
      attack: 2,
      defense: 2,
      abilities: [
        {trigger: 'Fanfare', description: 'ファンファーレ フェアリー2枚を自分の手札に加える'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 6,
      name: 'フェアリーテイマー',
      cost: 2,
      type: 'Follower',
      attack: 2,
      defense: 2,
      abilities: [
        {trigger: 'Fanfare', description: 'ファンファーレ フェアリー2枚を自分の手札に加える'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 6,
      name: 'フェアリーテイマー',
      cost: 2,
      type: 'Follower',
      attack: 2,
      defense: 2,
      abilities: [
        {trigger: 'Fanfare', description: 'ファンファーレ フェアリー2枚を自分の手札に加える'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 7,
      name: '舞い踊る妖精',
      cost: 2,
      type: 'Follower',
      attack: 2,
      defense: 2,
      abilities: [
        {trigger: 'Fanfare', description: 'ファンファーレ コンボ_3 自分の場の他のフォロワーすべては+1/+1する。'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 7,
      name: '舞い踊る妖精',
      cost: 2,
      type: 'Follower',
      attack: 2,
      defense: 2,
      abilities: [
        {trigger: 'Fanfare', description: 'ファンファーレ コンボ_3 自分の場の他のフォロワーすべては+1/+1する。'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 7,
      name: '舞い踊る妖精',
      cost: 2,
      type: 'Follower',
      attack: 2,
      defense: 2,
      abilities: [
        {trigger: 'Fanfare', description: 'ファンファーレ コンボ_3 自分の場の他のフォロワーすべては+1/+1する。'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 8,
      name: 'ベビーカーバンクル',
      cost: 2,
      type: 'Follower',
      attack: 2,
      defense: 2,
      abilities: [
        {trigger: 'Fanfare',effectType: 'Draw', description: '自分の場の他のカード1枚を選ぶ。それを手札に戻す。'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 8,
      name: 'ベビーカーバンクル',
      cost: 2,
      type: 'Follower',
      attack: 2,
      defense: 2,
      abilities: [
        {trigger: 'Fanfare',effectType: 'Draw', description: '自分の場の他のカード1枚を選ぶ。それを手札に戻す。'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 8,
      name: 'ベビーカーバンクル',
      cost: 2,
      type: 'Follower',
      attack: 2,
      defense: 2,
      abilities: [
        {trigger: 'Fanfare',effectType: 'Draw', description: '自分の場の他のカード1枚を選ぶ。それを手札に戻す。'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 9,
      name: 'ピュアクリスタリア・リリィ',
      cost: 2,
      type: 'Follower',
      attack: 1,
      defense: 3,
      abilities: [
        {trigger: 'Fanfare',effectType: 'SelectDestroy', description: 'ファンファーレ コンボ_3 相手の場のフォロワー1枚を選ぶ。それは体力1になる。'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 9,
      name: 'ピュアクリスタリア・リリィ',
      cost: 2,
      type: 'Follower',
      attack: 1,
      defense: 3,
      abilities: [
        {trigger: 'Fanfare',effectType: 'SelectDestroy', description: 'ファンファーレ コンボ_3 相手の場のフォロワー1枚を選ぶ。それは体力1になる。'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 10,
      name: '殺戮のリノセウス',
      cost: 3,
      type: 'Follower',
      attack: 0,
      defense: 2,
      abilities: [
        {trigger: 'Fanfare',effectType: 'SelectDestroy', description: 'ファンファーレ これは+X/+0する。Xは自分のコンボである。', abilityType: 'SHISSOU'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 10,
      name: '殺戮のリノセウス',
      cost: 3,
      type: 'Follower',
      attack: 0,
      defense: 2,
      abilities: [
        {trigger: 'Fanfare',effectType: 'SelectDestroy', description: 'ファンファーレ これは+X/+0する。Xは自分のコンボである。', abilityType: 'SHISSOU'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 10,
      name: '殺戮のリノセウス',
      cost: 3,
      type: 'Follower',
      attack: 0,
      defense: 2,
      abilities: [
        {trigger: 'Fanfare',effectType: 'SelectDestroy', description: 'ファンファーレ これは+X/+0する。Xは自分のコンボである。', abilityType: 'SHISSOU'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 11,
      name: 'ビギンズブレイダー・アマツ',
      cost: 3,
      type: 'Follower',
      attack: 2,
      defense: 2,
      abilities: [
        {trigger: 'Fanfare', effectType: 'SelectDestroy',description: 'ファンファーレ これは+X/+Xする。Xは自分の手札の妖精・フォロワーの枚数である。'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 12,
      name: '聖樹の杖',
      cost: 3,
      type: 'Amulet',
      abilities: [
        {trigger: 'Fanfare', effectType: 'SelectDestroy',description: '自分のターン終了時、コンボ_3 自分のデッキから1枚を引く。アクト これを破壊。自分の場の他のカード1枚を選ぶ。それを手札に戻す'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 12,
      name: '聖樹の杖',
      cost: 3,
      type: 'Amulet',
      abilities: [
        {trigger: 'Fanfare', effectType: 'SelectDestroy',description: '自分のターン終了時、コンボ_3 自分のデッキから1枚を引く。アクト これを破壊。自分の場の他のカード1枚を選ぶ。それを手札に戻す'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 12,
      name: '聖樹の杖',
      cost: 3,
      type: 'Amulet',
      abilities: [
        {trigger: 'Fanfare', effectType: 'SelectDestroy',description: '自分のターン終了時、コンボ_3 自分のデッキから1枚を引く。アクト これを破壊。自分の場の他のカード1枚を選ぶ。それを手札に戻す'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 13,
      name: '薫交の天宮・バックウッド',
      cost: 5,
      type: 'Follower',
      attack: 3,
      defense: 3,
      abilities: [
        {trigger: 'Fanfare',effectType: 'Draw', description: '自分のデッキから2枚を引く。'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 13,
      name: '薫交の天宮・バックウッド',
      cost: 5,
      type: 'Follower',
      attack: 3,
      defense: 3,
      abilities: [
        {trigger: 'Fanfare',effectType: 'Draw', description: '自分のデッキから2枚を引く。'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 13,
      name: '薫交の天宮・バックウッド',
      cost: 5,
      type: 'Follower',
      attack: 3,
      defense: 3,
      abilities: [
        {trigger: 'Fanfare',effectType: 'Draw', description: '自分のデッキから2枚を引く。'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 14,
      name: '自然の妖精姫・アリア',
      cost: 6,
      type: 'Follower',
      attack: 4,
      defense: 4,
      abilities: [
        {trigger: 'Fanfare', effectType: 'SelectDamage', values: {value1: 7},description: 'ファンファーレ 自分はクレスト: 自然の妖精姫・アリアを持つ。'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 14,
      name: '自然の妖精姫・アリア',
      cost: 6,
      type: 'Follower',
      attack: 4,
      defense: 4,
      abilities: [
        {trigger: 'Fanfare', effectType: 'SelectDamage', values: {value1: 7},description: 'ファンファーレ 自分はクレスト: 自然の妖精姫・アリアを持つ。'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 14,
      name: '自然の妖精姫・アリア',
      cost: 6,
      type: 'Follower',
      attack: 4,
      defense: 4,
      abilities: [
        {trigger: 'Fanfare', effectType: 'SelectDamage', values: {value1: 7},description: 'ファンファーレ 自分はクレスト: 自然の妖精姫・アリアを持つ。'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 15,
      name: '煌撃の戦士・ベイル',
      cost: 8,
      type: 'Follower',
      attack: 4,
      defense: 4,
      abilities: [
        {trigger: 'Fanfare',conditionType: 'FieldCondition', triggerConditions: 'HAS_EVOLED_FOLLOWER', effectType: 'AoeDamage', values: {value1: 7}, description: '手札で働く。自分のフォロワーが場を離れたとき、これのコストを-1する。ファンファーレ 相手の場のフォロワーを1枚を選ぶ。それに4ダメージ。'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 15,
      name: '煌撃の戦士・ベイル',
      cost: 8,
      type: 'Follower',
      attack: 4,
      defense: 4,
      abilities: [
        {trigger: 'Fanfare',conditionType: 'FieldCondition', triggerConditions: 'HAS_EVOLED_FOLLOWER', effectType: 'AoeDamage', values: {value1: 7}, description: '手札で働く。自分のフォロワーが場を離れたとき、これのコストを-1する。ファンファーレ 相手の場のフォロワーを1枚を選ぶ。それに4ダメージ。'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 15,
      name: '煌撃の戦士・ベイル',
      cost: 8,
      type: 'Follower',
      attack: 4,
      defense: 4,
      abilities: [
        {trigger: 'Fanfare',conditionType: 'FieldCondition', triggerConditions: 'HAS_EVOLED_FOLLOWER', effectType: 'AoeDamage', values: {value1: 7}, description: '手札で働く。自分のフォロワーが場を離れたとき、これのコストを-1する。ファンファーレ 相手の場のフォロワーを1枚を選ぶ。それに4ダメージ。'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    }
];