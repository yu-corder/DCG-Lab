import type { Conditions, ConditionContext, ConditionResult } from "../base";


const hasEvoledFollower = ( context: ConditionContext ): ConditionResult => {
    const hasEvoledFollower = context.field.some(card => card.isEvolved || card.isExEvolved);
    return { condition: hasEvoledFollower};
}

export const fieldCondition: Conditions = {
  conditionDispatcher(context: ConditionContext, trigger: string, value?: number): ConditionResult {
    switch (trigger) {
        case 'HAS_EVOLED_FOLLOWER':
        return hasEvoledFollower(context);

        default:
        return;
    }
    
    return { condition: true};
  }
};