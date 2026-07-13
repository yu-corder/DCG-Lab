import type { Card } from './types';

export interface GameContext {
  field: Card[];
  enemyField: Card[];
  hand: Card[];
  deck: Card[];
  token: Card[];
  
  myHealth: number;
  enemyHealth: number;
  maxPP: number;
  pp: number;
  
  myEp: number;
  enemyEp: number;
  myExEp: number;
  enemyExEp: number;
  
  hasEvolvedThisTurn: boolean;
  turn: number;
  turnLog: any;
}