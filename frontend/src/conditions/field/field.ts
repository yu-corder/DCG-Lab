import type { ConditionContext, ConditionResult, CardCondition } from "../index";

const hasEvoledFollower = (context: ConditionContext): ConditionResult => {
  const isEvolvedInField = context.field.some(card => card.isEvolved || card.isExEvolved);
  return { condition: isEvolvedInField };
};


export const checkFieldCondition = (
  context: ConditionContext,
  condition: CardCondition
): ConditionResult => {
  switch (condition.subType) {
    case 'HAS_EVOLED_FOLLOWER':
      return hasEvoledFollower(context);

    default:
      return { condition: true };
  }
};