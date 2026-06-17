import type { ConditionContext, ConditionResult, CardCondition } from "../index";

const hasMatchingConbo = (context: ConditionContext, value: number): ConditionResult => {
  const isMatchingConbo = value <= context.turnLog.oneTurnPlayCount;
  return { condition: isMatchingConbo };
};

export const checkPlayCondition = (
  context: ConditionContext,
  condition: CardCondition,
): ConditionResult => {
  switch (condition.subType) {
    case 'HAS_MATCHING_CONBO':
      return hasMatchingConbo(context, condition.value);

    default:
      return { condition: true };
  }
};