import type { GameContext } from '../../../../shared/game';
import { cloneCards } from './cardUtils';

export const mergeGameEffectResult = (ctx: GameContext, result: any) => {
  if (!result) return;
  if (result.myField) ctx.field = cloneCards(result.myField);
  if (result.enemyField) ctx.enemyField = cloneCards(result.enemyField);
  if (result.hand) ctx.hand = cloneCards(result.hand.filter(Boolean));
  if (result.deck) ctx.deck = cloneCards(result.deck);
  if (result.token) ctx.token = cloneCards(result.token);
  if (result.myHealth !== undefined) ctx.myHealth = result.myHealth;
  if (result.enemyHealth !== undefined) ctx.enemyHealth = result.enemyHealth;
  if (result.pp !== undefined) ctx.pp = result.pp;
};