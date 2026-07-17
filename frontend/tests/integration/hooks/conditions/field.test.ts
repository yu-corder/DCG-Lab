import { describe, it, expect, mock, beforeEach } from "bun:test";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useGameState } from "../../../../src/hooks/useGameState";
import { testDeck_17, testDeck_18 } from "../../deck";

describe("Field Condition System", () => {
  beforeEach(() => {
    globalThis.alert = mock(() => {});
  });

  it("should trigger effect only when an evolved follower exists on field", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () => Promise.resolve({ cards: testDeck_17, myLeader: 'Royal', enemyLeader: 'Royal', token: [], crest: [] }),
      } as Response)
    ) as any;

    const { result } = renderHook(() => useGameState());
    await waitFor(() => { expect(result.current.hand.length).toBe(4); });
    act(() => { result.current.handleMulliganConfirm([]); });

    act(() => { result.current.enemyPlayCard(); });
    expect(result.current.enemyField.length).toBe(1);
    expect(result.current.enemyField[0].defense).toBe(2);

    const card1 = result.current.hand[0];
    act(() => { result.current.playCard(card1); });

    expect(result.current.enemyField[0].defense).toBe(2);

    const myFollowerId = result.current.field[0].instanceId!;
    act(() => { result.current.endTurn(); });
    act(() => { result.current.endTurn(); });
    act(() => { result.current.endTurn(); });
    act(() => { result.current.evolveFollower(myFollowerId); });
    expect(result.current.field[0].isEvolved).toBe(true);

    const card2 = result.current.hand[0];
    act(() => { result.current.playCard(card2); });
    expect(result.current.enemyField[0].defense).toBe(1);
  });

  it("should trigger effect only when a follower with matching cost exists on field", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () => Promise.resolve({ cards: testDeck_18, myLeader: 'Royal', enemyLeader: 'Royal', token: [], crest: [] }),
      } as Response)
    ) as any;

    const { result } = renderHook(() => useGameState());
    await waitFor(() => { expect(result.current.hand.length).toBe(4); });
    act(() => { result.current.handleMulliganConfirm([]); });

    act(() => { result.current.damageMyLeader(5); });
    expect(result.current.myHealth).toBe(15);

    const card1 = result.current.hand[0];
    act(() => { result.current.playCard(card1); });

    expect(result.current.myHealth).toBe(15);

    act(() => { result.current.endTurn(); });
    
    const card2 = result.current.hand[0];
    act(() => { result.current.playCard(card2); });

    expect(result.current.myHealth).toBe(18);
  });
});