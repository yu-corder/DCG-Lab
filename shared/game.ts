import type { Card } from './types';

export interface GameContext {
  field: Card[];
  hand: Card[];
  deck: Card[];
  myHealth: number;
  maxPP: number;
  pp: number;
  hasEvolvedThisTurn: boolean;

  enemyField: Card[];
  enemyHealth: number;
  
  turn: number;
  token: Card[];
  turnLog: any;
}