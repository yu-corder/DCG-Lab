export type CardType = 'Follower' | 'Spell' | 'Amulet';

export type AbilityTrigger = 'Fanfare' | 'LastWord' | 'Strike';

export type AbilityType = 'STORM' | 'WARD' | 'DRAIN';

export interface Ability {
  trigger: AbilityTrigger;
  description: string;
  // 将来的にロジックを組むためのプロパティ
  effectType?: 'Damage' | 'Draw' | 'Heal';
  value?: number;
}

export interface Card {
  id: string;
  name: string;
  cost: number;
  type: CardType;
  attack?: number;
  defense?: number;
  abilities: Ability[];
}

export interface GameState {
  turn: number;
  currentPP: number;
  maxPP: number;
  hand: Card[];
  field: Card[];
}