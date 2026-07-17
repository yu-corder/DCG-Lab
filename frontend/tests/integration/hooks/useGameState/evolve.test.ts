import { describe, it, expect, mock, beforeEach } from "bun:test";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useGameState } from "../../../../src/hooks/useGameState";
import { testDeck_8 } from "../../deck";

describe("Evolution System", () => {

  beforeEach(() => {
    globalThis.alert = mock(() => {});
  });

  it("should handle normal evolution and ex-evolution with proper validation", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            cards: testDeck_8,
            myLeader: 'Royal',
            enemyLeader: 'Royal',
            token: [],
            crest: []
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

    const follower = result.current.hand[0];
    act(() => {
      result.current.playCard(follower);
    });
    
    const placedFollowerId = result.current.field[0].instanceId!;

    act(() => {
      result.current.evolveFollower(placedFollowerId);
    });
    expect(result.current.field[0].isEvolved).toBe(false);

    act(() => { result.current.endTurn(); });
    act(() => { result.current.endTurn(); });
    act(() => { result.current.endTurn(); });
    expect(result.current.turn).toBe(4);

    act(() => {
      result.current.evolveFollower(placedFollowerId);
    });

    const evolvedCard = result.current.field.find(c => c.instanceId === placedFollowerId)!;
    expect(evolvedCard.isEvolved).toBe(true);
    expect(evolvedCard.isExEvolved).toBe(false);
    expect(evolvedCard.attack).toBe(3);
    expect(evolvedCard.defense).toBe(3);
    expect(result.current.myEp).toBe(1);

    act(() => {
      result.current.exEvolveFollower(placedFollowerId);
    });
    expect(result.current.field[0].isExEvolved).toBe(false);

    const secondFollower = result.current.hand[0];
    act(() => {
      result.current.playCard(secondFollower);
    });
    const secondFollowerId = result.current.field.find(c => c.instanceId !== placedFollowerId)!.instanceId!;

    act(() => {
      result.current.exEvolveFollower(secondFollowerId);
    });
    expect(result.current.field.find(c => c.instanceId === secondFollowerId)!.isEvolved).toBe(false);

    act(() => { result.current.endTurn(); });
    act(() => { result.current.endTurn(); });
    expect(result.current.turn).toBe(6);

    act(() => {
      result.current.exEvolveFollower(secondFollowerId);
    });

    const exEvolvedCard = result.current.field.find(c => c.instanceId === secondFollowerId)!;
    expect(exEvolvedCard.isEvolved).toBe(true);
    expect(exEvolvedCard.isExEvolved).toBe(true);
    expect(exEvolvedCard.attack).toBe(4);
    expect(exEvolvedCard.defense).toBe(4);
    expect(result.current.myExEp).toBe(1);

    act(() => {
      result.current.enemyPlayCard();
    });
    expect(result.current.enemyField.length).toBe(1);
    const enemyFollower = result.current.enemyField[0];
    const enemyFollowerId = enemyFollower.instanceId!;

    act(() => {
      result.current.attackToFollower(secondFollowerId, enemyFollowerId);
    });

    const postAttackMyCard = result.current.field.find(c => c.instanceId === secondFollowerId)!;
    expect(postAttackMyCard.defense).toBe(4);
    expect(result.current.enemyField.length).toBe(0);
  });
});