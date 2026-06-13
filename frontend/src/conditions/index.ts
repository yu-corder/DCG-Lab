import type { Card } from '../../../shared/types';

// export interface SelectDamageEffect {
//   type: 'SelectDamage';
//   value: number;
// }

// export interface AoEDamageEffect {
//   type: 'AoEDamage';
//   value: number;
// }

// export interface SelectDestroyEffect {
//   type: 'SelectDestroy';
// }

// export interface BuffEffect {
//   type: 'Buff';
//   attack: number;
//   defense: number;
// }

// export interface DrawEffect {
//   type: 'Draw';
// }

// export type ConditionText = 
//   | HasEvoledFollower;

// export interface ConditionContext {
//   field: Card[];
//   enemyField: Card[];
//   hand: Card[];
//   deck: Card[];
// }
// export const applyCardEffect = (
//   context: ConditionContext, 
//   condition: ConditionText, 
//   conditionVal?: number
// ) => {
//   switch (condition.type) {
//     case 'HAS_EVOLED_FOLLOWER':
//       return {};
//     default:
//       return {};
//   }
// };