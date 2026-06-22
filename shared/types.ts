export type CardType = 'Follower' | 'Spell' | 'Amulet';

export type AbilityTrigger = 'Fanfare' | 'LastWord' | 'Strike' | 'Enhance' | 'Evolve';

export type TriggerConditions = 'HAS_EVOLED_FOLLOWER' | 'HAS_MATCHING_COST_FOLLOWER' | 'HAS_MATCHING_CONBO';

export type ConditionType = 'FieldCondition' | 'PlayCondition';

export type AbilityType = 'STORM' | 'WARD' | 'DRAIN' | 'SHISSOU';

export type Leader = 'Royal' | 'Nemesis' | 'Bishop' | 'Nightmare' | 'Elf' | 'Dragon' | 'Witch';

export interface EfectValues {
  attack?: number;
  defense?: number;
  value1?: number;
  value2?: number;
}

export interface Ability {
  trigger: AbilityTrigger;
  description: string;
  // 将来的にロジックを組むためのプロパティ
  effectType?: 'Damage' | 'Draw' | 'MyHealthHeal' | 'AoeDamage' | 'SelectDamage' | 'SelectDestroy' | 'Draw' | 'GetToken';
  values?: EfectValues;
  abilityType?: AbilityType;
  conditionType?: ConditionType;
  triggerConditions?: TriggerConditions;
  conditionValue?: number;
}

export interface Card {
  id: number;
  name: string;
  cost: number;
  type: CardType;
  attack?: number;
  defense?: number;
  abilities: Ability[];
  hasAttacked: boolean;
  isEvolved: boolean;
  playedThisTurn: boolean;
  isExEvolved: boolean;
  instanceId?: string;
}

export interface GameState {
  turn: number;
  currentPP: number;
  maxPP: number;
  hand: Card[];
  field: Card[];
}

export interface GameInitResponse {
  cards: Card[];
  myLeader: Leader;
  enemyLeader: Leader;
  token: Card[];
}

export interface TurnActionLog {
  cardPlayed: Card[];
  followersSummoned: number;
  spellsCast: number;
  oneTurnPlayCount: number;
}