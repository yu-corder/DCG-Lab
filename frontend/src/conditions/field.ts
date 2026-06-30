import type { ConditionContext, ConditionResult, CardCondition } from "./index";

const hasEvoledFollower = (context: ConditionContext): ConditionResult => {
  const isEvolvedInField = context.field.some(card => card.isEvolved || card.isExEvolved);
  return { condition: isEvolvedInField };
};

const hasMatchingCostFollower = (context: ConditionContext, condition: CardCondition): ConditionResult => {
  return { condition: context.field.some(card => card.cost === condition.value)　||  context.enemyField.some(card => card.cost === condition.value)};
};

export const checkFieldCondition = (
  context: ConditionContext,
  condition: CardCondition,
): ConditionResult => {
  switch (condition.subType) {
    case 'HAS_EVOLED_FOLLOWER':
      return hasEvoledFollower(context);

    case 'HAS_MATCHING_COST_FOLLOWER':
      return hasMatchingCostFollower(context, condition);

    default:
      return { condition: true };
  }
};