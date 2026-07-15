import type { Card } from '../shared/types';

export const token: Card[] = [
    {
      id: 1,
      name: 'フェアリー',
      baseCost: 1,
      cost: 1,
      type: 'Follower',
      subtypes: ['Fairy'],
      attack: 1,
      defense: 1,
      abilities: [
        {abilityType: 'RUSH', description: 'a', trigger: 'Fanfare'}
      ],
      hasAttacked: true,
      isEvolved: false,
      playedThisTurn: false,
      isExEvolved: false,
      isRushActive: false,
    },
];