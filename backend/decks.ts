import type { Card } from '../shared/types';

export const albert: Card[] = [
    // ==========================================
    // 1. 【選択ダメージ】アドベンチャーエルフ・メイ (3枚)
    // ==========================================
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

    // ==========================================
    // 2. 純粋なるウォーターフェアリー (3枚)
    // ==========================================
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

    // ==========================================
    // 3. 虫の知らせ (3枚)
    // ==========================================
    {
      id: 7,
      name: '虫の知らせ',
      cost: 1,
      type: 'Spell',
      abilities: [
        { trigger: 'Fanfare', description: '自分の場のカード1枚を選ぶ。それを手札に戻す。相手の場のフォロワーからランダム1枚に2ダメージ。' }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 8,
      name: '虫の知らせ',
      cost: 1,
      type: 'Spell',
      abilities: [
        { trigger: 'Fanfare', description: '自分の場のカード1枚を選ぶ。それを手札に戻す。相手の場のフォロワーからランダム1枚に2ダメージ。' }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 9,
      name: '虫の知らせ',
      cost: 1,
      type: 'Spell',
      abilities: [
        { trigger: 'Fanfare', description: '自分の場のカード1枚を選ぶ。それを手札に戻す。相手の場のフォロワーからランダム1枚に2ダメージ。' }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },

    // ==========================================
    // 4. 妖精の召集 (3枚)
    // ==========================================
    {
      id: 10,
      name: '妖精の召集',
      cost: 1,
      type: 'Spell',
      abilities: [
        {
          trigger: 'Fanfare',
          effectType: 'GetToken',
          values: {value1: 2, value2: 1},
          description: 'フェアリー2枚を自分の手札に加える。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 11,
      name: '妖精の召集',
      cost: 1,
      type: 'Spell',
      abilities: [
        {
          trigger: 'Fanfare',
          effectType: 'GetToken',
          values: {value1: 2, value2: 1},
          description: 'フェアリー2枚を自分の手札に加える。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 12,
      name: '妖精の召集',
      cost: 1,
      type: 'Spell',
      abilities: [
        {
          trigger: 'Fanfare',
          effectType: 'GetToken',
          values: {value1: 2, value2: 1},
          description: 'フェアリー2枚を自分の手札に加える。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },

    // ==========================================
    // 5. 【進化時：選択破壊】楽朗の天宮・フィルドア (3枚)
    // ==========================================
    {
      id: 13,
      name: '楽朗の天宮・フィルドア',
      cost: 2,
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
      cost: 2,
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
      cost: 2,
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

    // ==========================================
    // 6. フェアリーテイマー (3枚)
    // ==========================================
    {
      id: 16,
      name: 'フェアリーテイマー',
      cost: 2,
      type: 'Follower',
      attack: 2,
      defense: 2,
      abilities: [
        {
          trigger: 'Fanfare',
          effectType: 'GetToken',
          values: {value1: 2, value2: 1},
          description: 'ファンファーレ フェアリー2枚を自分の手札に加える。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 17,
      name: 'フェアリーテイマー',
      cost: 2,
      type: 'Follower',
      attack: 2,
      defense: 2,
      abilities: [
        {
          trigger: 'Fanfare',
          effectType: 'GetToken',
          values: {value1: 2, value2: 1},
          description: 'ファンファーレ フェアリー2枚を自分の手札に加える。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 18,
      name: 'フェアリーテイマー',
      cost: 2,
      type: 'Follower',
      attack: 2,
      defense: 2,
      abilities: [
        {
          trigger: 'Fanfare',
          effectType: 'GetToken',
          values: {value1: 2, value2: 1},
          description: 'ファンファーレ フェアリー2枚を自分の手札に加える。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },

    // ==========================================
    // 7. 舞い踊る妖精 (3枚)
    // ==========================================
    {
      id: 19,
      name: '舞い踊る妖精',
      cost: 2,
      type: 'Follower',
      attack: 2,
      defense: 2,
      abilities: [
        { 
          trigger: 'Fanfare',
          effectType: 'MyFieldAllBuf',
          values: {attack: 1, defense: 1},
          conditionType: 'PlayCondition',
          triggerConditions: 'HAS_MATCHING_CONBO',
          conditionValue: 3,
          description: 'ファンファーレ コンボ_3 自分の場の他のフォロワーすべては+1/+1する。' 
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 20,
      name: '舞い踊る妖精',
      cost: 2,
      type: 'Follower',
      attack: 2,
      defense: 2,
      abilities: [
        { 
          trigger: 'Fanfare',
          effectType: 'MyFieldAllBuf',
          values: {attack: 1, defense: 1},
          conditionType: 'PlayCondition',
          triggerConditions: 'HAS_MATCHING_CONBO',
          conditionValue: 3,
          description: 'ファンファーレ コンボ_3 自分の場の他のフォロワーすべては+1/+1する。' 
        }

      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 21,
      name: '舞い踊る妖精',
      cost: 2,
      type: 'Follower',
      attack: 2,
      defense: 2,
      abilities: [
        { 
          trigger: 'Fanfare',
          effectType: 'MyFieldAllBuf',
          values: {attack: 1, defense: 1},
          conditionType: 'PlayCondition',
          triggerConditions: 'HAS_MATCHING_CONBO',
          conditionValue: 3,
          description: 'ファンファーレ コンボ_3 自分の場の他のフォロワーすべては+1/+1する。' 
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },

    // ==========================================
    // 8. 【ドロー】ベビーカーバンクル (3枚)
    // ==========================================
    {
      id: 22,
      name: 'ベビーカーバンクル',
      cost: 2,
      type: 'Follower',
      attack: 2,
      defense: 2,
      abilities: [
        {
          trigger: 'Fanfare',
          effectType: 'SelectBounce',
          values: {},
          description: 'ファンファーレ 自分の場の他のカード1枚を選ぶ。それを手札に戻す。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 23,
      name: 'ベビーカーバンクル',
      cost: 2,
      type: 'Follower',
      attack: 2,
      defense: 2,
      abilities: [
        {
          trigger: 'Fanfare',
          effectType: 'SelectBounce',
          values: {},
          description: 'ファンファーレ 自分の場の他のカード1枚を選ぶ。それを手札に戻す。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 24,
      name: 'ベビーカーバンクル',
      cost: 2,
      type: 'Follower',
      attack: 2,
      defense: 2,
      abilities: [
        {
          trigger: 'Fanfare',
          effectType: 'SelectBounce',
          values: {},
          description: 'ファンファーレ 自分の場の他のカード1枚を選ぶ。それを手札に戻す。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },

    // ==========================================
    // 9. ピュアクリスタリア・リリィ (1枚に調整)
    // ==========================================
    {
      id: 25,
      name: 'ピュアクリスタリア・リリィ',
      cost: 2,
      type: 'Follower',
      attack: 1,
      defense: 3,
      abilities: [
        { 
          trigger: 'Fanfare',
          effectType: 'SelectStatsFix',
          values: {fixedDefense: 1},
          conditionType: 'PlayCondition',
          triggerConditions: 'HAS_MATCHING_CONBO',
          conditionValue: 3,
          description: 'ファンファーレ コンボ_3 相手の場のフォロワー1枚を選ぶ。それは体力1になる。' 
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },

    // ==========================================
    // 10. 殺戮のリノセウス (3枚)
    // ==========================================
    {
      id: 27,
      name: '殺戮のリノセウス',
      cost: 3,
      type: 'Follower',
      attack: 0,
      defense: 2,
      abilities: [
        { 
          trigger: 'Fanfare',
          effectType: 'StatsBuf',
          values: { attackSource: 'CurrentCombo' },
          description: 'ファンファーレ これは+X/+0する。Xは自分のコンボである。',
          abilityType: 'SHISSOU'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 28,
      name: '殺戮のリノセウス',
      cost: 3,
      type: 'Follower',
      attack: 0,
      defense: 2,
      abilities: [
        { 
          trigger: 'Fanfare',
          effectType: 'StatsBuf',
          values: { attackSource: 'CurrentCombo' },
          description: 'ファンファーレ これは+X/+0する。Xは自分のコンボである。',
          abilityType: 'SHISSOU'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 29,
      name: '殺戮のリノセウス',
      cost: 3,
      type: 'Follower',
      attack: 0,
      defense: 2,
      abilities: [
        { 
          trigger: 'Fanfare',
          effectType: 'StatsBuf',
          values: { attackSource: 'CurrentCombo' },
          description: 'ファンファーレ これは+X/+0する。Xは自分のコンボである。',
          abilityType: 'SHISSOU'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },

    // ==========================================
    // 11. ビギンズブレイダー・アマツ (1枚に調整)
    // ==========================================
    {
      id: 30,
      name: 'ビギンズブレイダー・アマツ',
      cost: 3,
      type: 'Follower',
      attack: 2,
      defense: 2,
      abilities: [
        { 
          trigger: 'Fanfare',
          effectType: 'StatsBuf',
          values: { attackSource: 'HandCardCountWithSubtype', defenseSource: 'HandCardCountWithSubtype', targetSubtype: 'Fairy'},
          description: 'ファンファーレ これは+X/+Xする。Xは自分の手札の妖精・フォロワーの枚数である。',
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },

    // ==========================================
    // 12. 聖樹の杖 (3枚)
    // ==========================================
    {
      id: 32,
      name: '聖樹の杖',
      cost: 3,
      type: 'Amulet',
      abilities: [
        { trigger: 'Fanfare', description: '自分のターン終了時、コンボ_3 自分のデッキから1枚を引く。アクト これを破壊。自分の場の他のカード1枚を選ぶ。それを手札に戻す。' }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 33,
      name: '聖樹の杖',
      cost: 3,
      type: 'Amulet',
      abilities: [
        { trigger: 'Fanfare', description: '自分のターン終了時、コンボ_3 自分のデッキから1枚を引く。アクト これを破壊。自分の場の他のカード1枚を選ぶ。それを手札に戻す。' }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 34,
      name: '聖樹の杖',
      cost: 3,
      type: 'Amulet',
      abilities: [
        { trigger: 'Fanfare', description: '自分のターン終了時、コンボ_3 自分のデッキから1枚を引く。アクト これを破壊。自分の場の他のカード1枚を選ぶ。それを手札に戻す。' }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },

    // ==========================================
    // 13. 薫交の天宮・バックウッド (3枚)
    // ==========================================
    {
      id: 35,
      name: '薫交の天宮・バックウッド',
      cost: 5,
      type: 'Follower',
      attack: 3,
      defense: 3,
      abilities: [
        {
          trigger: 'Fanfare',
          effectType: 'Draw',
          values: {},
          description: 'ファンファーレ 自分のデッキから2枚を引く。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 36,
      name: '薫交の天宮・バックウッド',
      cost: 5,
      type: 'Follower',
      attack: 3,
      defense: 3,
      abilities: [
        {
          trigger: 'Fanfare',
          effectType: 'Draw',
          values: {},
          description: 'ファンファーレ 自分のデッキから2枚を引く。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 37,
      name: '薫交の天宮・バックウッド',
      cost: 5,
      type: 'Follower',
      attack: 3,
      defense: 3,
      abilities: [
        {
          trigger: 'Fanfare',
          effectType: 'Draw',
          values: {},
          description: 'ファンファーレ 自分のデッキから2枚を引く。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },

    // ==========================================
    // 14. 【リーダー回復】自然の妖精姫・アリア (3枚)
    // ==========================================
    {
      id: 38,
      name: '自然の妖精姫・アリア',
      cost: 6,
      type: 'Follower',
      attack: 4,
      defense: 4,
      abilities: [
        {
          trigger: 'Fanfare',
          effectType: 'MyHealthHeal',
          values: { value1: 5 },
          description: 'ファンファーレ 自分のリーダーの体力を5回復する。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 39,
      name: '自然の妖精姫・アリア',
      cost: 6,
      type: 'Follower',
      attack: 4,
      defense: 4,
      abilities: [
        {
          trigger: 'Fanfare',
          effectType: 'MyHealthHeal',
          values: { value1: 5 },
          description: 'ファンファーレ 自分のリーダーの体力を5回復する。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 40,
      name: '自然の妖精姫・アリア',
      cost: 6,
      type: 'Follower',
      attack: 4,
      defense: 4,
      abilities: [
        {
          trigger: 'Fanfare',
          effectType: 'MyHealthHeal',
          values: { value1: 5 },
          description: 'ファンファーレ 自分のリーダーの体力を5回復する。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },

    // ==========================================
    // 15. 煌撃の戦士・ベイル (1枚に調整)
    // ==========================================
    {
      id: 41,
      name: '煌撃の戦士・ベイル',
      cost: 8,
      type: 'Follower',
      attack: 4,
      defense: 4,
      abilities: [
        {
          trigger: 'Fanfare',
          conditionType: 'FieldCondition',
          triggerConditions: 'HAS_EVOLED_FOLLOWER',
          effectType: 'AoeDamage',
          values: { value1: 4 },
          description: 'ファンファーレ 相手の場のフォロワーすべてに4ダメージ。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },

    // ==========================================
    // 新規追加：進化時効果持ちフォロワー (計5枚)
    // ==========================================
    {
      id: 44,
      name: 'インセクトブレイサー',
      cost: 3,
      type: 'Follower',
      attack: 3,
      defense: 3,
      abilities: [
        {
          trigger: 'Fanfare',
          conditionType: 'FieldCondition',
          triggerConditions: 'HAS_EVOLED_FOLLOWER',
          effectType: 'AoeDamage',
          values: { value1: 4 },
          description: 'ファンファーレ 相手の場のフォロワーすべてに4ダメージ。'
        },
        {
          trigger: 'Evolve',
          effectType: 'AoeDamage',
          values: { value1: 2 },
          description: '進化時 相手の場のフォロワーすべてに2ダメージ。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 45,
      name: '世界樹の導き手',
      cost: 4,
      type: 'Follower',
      attack: 3,
      defense: 4,
      abilities: [
        {
          trigger: 'Evolve',
          effectType: 'MyHealthHeal',
          values: { value1: 3 },
          description: '進化時 自分のリーダーの体力を3回復する。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 46,
      name: 'エルフアサシン',
      cost: 4,
      type: 'Follower',
      attack: 4,
      defense: 3,
      abilities: [
        {
          trigger: 'Evolve',
          effectType: 'SelectDamage',
          values: { value1: 4 },
          description: '進化時 相手の場のフォロワー1体を選ぶ。それに4ダメージ。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 47,
      name: 'フェアリーナイト',
      cost: 4,
      type: 'Follower',
      attack: 4,
      defense: 4,
      abilities: [
        {
          trigger: 'Evolve',
          effectType: 'SelectDestroy',
          values: {},
          description: '進化時 相手の場のフォロワー1枚を選ぶ。それを破壊する。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    },
    {
      id: 48,
      name: '深緑の賢者',
      cost: 5,
      type: 'Follower',
      attack: 4,
      defense: 5,
      abilities: [
        {
          trigger: 'Evolve',
          effectType: 'Draw',
          values: {},
          description: '進化時 自分のデッキから1枚を引く。'
        }
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
    }
];