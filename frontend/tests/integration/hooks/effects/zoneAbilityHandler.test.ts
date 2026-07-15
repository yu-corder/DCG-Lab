import { describe, it, expect, mock, beforeEach } from "bun:test";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useGameState } from "../../../../src/hooks/useGameState";
import { testDeck_27 } from "../../deck";

describe("Zone Ability System - Hand Trigger", () => {
  beforeEach(() => {
    globalThis.alert = mock(() => {});
  });

  it("should reduce card cost in hand when a friendly follower leaves the field via combat death", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () => Promise.resolve({ cards: testDeck_27, myLeader: 'Forest', enemyLeader: 'Royal', token: [] }),
      } as Response)
    ) as any;

    const { result } = renderHook(() => useGameState());
    await waitFor(() => { expect(result.current.hand.length).toBe(4); });
    act(() => { result.current.handleMulliganConfirm([]); });

    for (let i = 0; i < 3; i++) {
      act(() => { result.current.endTurn(); });
      act(() => { result.current.endTurn(); });
    }

    act(() => { result.current.enemyPlayCard(); });
    expect(result.current.enemyField.length).toBe(1);

    const myFollower = result.current.hand[0];
    expect(myFollower.cost).toBe(4);
    act(() => { result.current.playCard(myFollower); });
    expect(result.current.field.length).toBe(1);

    act(() => { result.current.endTurn(); });
    act(() => { result.current.endTurn(); });

    const remainingCardInHand = result.current.hand[0];
    expect(remainingCardInHand.cost).toBe(4);

    const myInstanceId = result.current.field[0].instanceId!;
    const enemyInstanceId = result.current.enemyField[0].instanceId!;
    
    act(() => { result.current.attackToFollower(myInstanceId, enemyInstanceId); });

    expect(result.current.field.length).toBe(0);

    expect(result.current.hand[0].cost).toBe(3);
  });

  it("should reduce card cost in hand when a friendly follower leaves the field via fanfare bounce", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () => Promise.resolve({ cards: testDeck_27, myLeader: 'Forest', enemyLeader: 'Royal', token: [] }),
      } as Response)
    ) as any;

    const { result } = renderHook(() => useGameState());
    await waitFor(() => { expect(result.current.hand.length).toBe(4); });
    act(() => { result.current.handleMulliganConfirm([]); });

    for (let i = 0; i < 3; i++) {
      act(() => { result.current.endTurn(); });
      act(() => { result.current.endTurn(); });
    }

    const targetCardInHand = result.current.hand[0];
    act(() => { result.current.playCard(targetCardInHand); });
    expect(result.current.field.length).toBe(1);

    act(() => { result.current.endTurn(); });
    act(() => { result.current.endTurn(); });

    const anotherCardInHand = result.current.hand[0];
    act(() => { result.current.playCard(anotherCardInHand); });

    act(() => {
      result.current.selectTargetCard(0);
    });

    const remainingCardInHand = result.current.hand[0];
    expect(remainingCardInHand.cost).toBe(3);
  });
});