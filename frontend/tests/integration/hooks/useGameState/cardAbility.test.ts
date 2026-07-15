import { describe, it, expect, mock } from "bun:test";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useGameState } from "../../../../src/hooks/useGameState";
import { testDeck_33, testDeck_34 } from "../../deck";
import { token } from '../../../../../backend/token.ts';

describe("Card Ability", () => {
  
  it("should allow a follower with Storm to attack the enemy leader on the turn it is played", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            cards: testDeck_33,
            myLeader: 'Royal',
            enemyLeader: 'Royal',
            token: [],
          }),
      } as Response)
    ) as any;

    const { result } = renderHook(() => useGameState());

    await waitFor(() => {
      expect(result.current.hand.length).toBe(4);
    });

    act(() => {
      result.current.handleMulliganConfirm([]);
    });

    act(() => {
      result.current.endTurn();
    });

    const firstCard = result.current.hand[0];
    

    act(() => {
      result.current.playCard(firstCard);
    });

    const myFollowerId = result.current.field[0].instanceId!;

    expect(result.current.field.length).toBe(1);
    expect(result.current.field[0].cardAbility).toBe('SHISSOU');
    act(() => {
      result.current.attackToLeader(myFollowerId);
    });
    expect(result.current.enemyHealth).toBe(19);
  });

  it("should allow a follower with Rush to attack enemy followers on the turn it is played, but not the enemy leader", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            cards: testDeck_34,
            myLeader: 'Royal',
            enemyLeader: 'Royal',
            token: token, 
          }),
      } as Response)
    ) as any;

    const { result } = renderHook(() => useGameState());

    await waitFor(() => {
      expect(result.current.hand.length).toBe(4);
    });

    act(() => {
      result.current.handleMulliganConfirm([]);
    });

    act(() => {
      result.current.endTurn();
    });

    act(() => {
      result.current.enemyPlayCard(); 
    });
    expect(result.current.enemyField.length).toBeGreaterThan(0);
    const enemyFollowerId = result.current.enemyField[0].instanceId!;

    const rushCard = result.current.hand.find(c => c.cardAbility === 'RUSH') || token[0];
    
    act(() => {
      result.current.playCard(rushCard);
    });

    const myRushFollowerId = result.current.field[0].instanceId!;
    expect(result.current.field[0].cardAbility).toBe('RUSH');

    act(() => {
      result.current.attackToLeader(myRushFollowerId);
    });
    expect(result.current.enemyHealth).toBe(20);

    act(() => {
      result.current.attackToFollower(myRushFollowerId, enemyFollowerId);
    });
    expect(result.current.field[0].hasAttacked).toBe(true);
  });
});