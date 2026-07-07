import type { Card } from '../../../../shared/types';

interface FieldDeltaContext {
  oldField: Card[];
  newField: Card[];
}

export const checkAndApplyZoneEffects = (
  currentHand: Card[],
  deltaContext: FieldDeltaContext
): Card[] => {
  const leftMyFollowersCount = deltaContext.oldField.filter(
    oldCard => oldCard.type === 'Follower' && !deltaContext.newField.some(newCard => newCard.instanceId === oldCard.instanceId)
  ).length;

  if (leftMyFollowersCount === 0) return currentHand;

  return currentHand.map(handCard => {
    const targetAbility = handCard.abilities?.find(
      a => a.trigger === 'Hand' && a.triggerConditions === 'HAS_MY_LEAVE_FOLLOWER'
    );

    if (targetAbility && targetAbility.effectType === 'ReduceCost') {
      const reduceValue = (targetAbility.values?.value1 ?? 1) * leftMyFollowersCount;
      return {
        ...handCard,
        cost: Math.max(0, handCard.cost - reduceValue)
      };
    }

    return handCard;
  });
};