import type { GameContext } from '../../../../shared/game';

interface AttackToLeaderCallbacks {
  onInvalidAttack: (message: string) => void;
  onVictory: (message: string) => void;
}


export const executeAttackToLeader = (
  ctx: GameContext,
  targetInstanceId: string,
  callbacks: AttackToLeaderCallbacks
) => {
  const targetCard = ctx.field.find(f => f.instanceId === targetInstanceId);
  if (!targetCard) return;

  const hasStorm = targetCard.abilities.some(a => a.abilityType === 'SHISSOU');
  if (targetCard.playedThisTurn && !hasStorm) {
    callbacks.onInvalidAttack("このフォロワーは、場に出たターンにはリーダーを攻撃できません。");
    return;
  }

  if (targetCard.hasAttacked) {
    callbacks.onInvalidAttack("このフォロワーはもう攻撃できません。");
    return;
  }

  if (ctx.enemyHealth - targetCard.attack <= 0) {
    ctx.enemyHealth -= (targetCard.attack || 0);
    callbacks.onVictory("バトルに勝利しました。");
    return;
  }

  ctx.enemyHealth -= (targetCard.attack || 0);
  ctx.field = ctx.field.map(card => 
    card.instanceId === targetInstanceId ? { ...card, hasAttacked: true } : card
  );
};