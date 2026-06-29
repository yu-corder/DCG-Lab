import { describe, it, expect, mock, beforeEach } from "bun:test";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useGameState } from "../../../../src/hooks/useGameState";
import { testDeck_16 } from "../../deck";

describe("Card Condition System", () => {
  beforeEach(() => {
    globalThis.alert = mock(() => {});
  });

  it("should trigger effect only when combo condition is satisfied", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () => Promise.resolve({ cards: testDeck_16, myLeader: 'Royal', enemyLeader: 'Royal', token: [] }),
      } as Response)
    ) as any;

    const { result } = renderHook(() => useGameState());
    await waitFor(() => { expect(result.current.hand.length).toBe(4); });
    act(() => { result.current.handleMulliganConfirm([]); });
    act(() => { result.current.endTurn(); });

    const card1 = result.current.hand[0];
    act(() => { result.current.playCard(card1); });
    

    expect(result.current.hand.length).toBe(5);

    const card2 = result.current.hand[0];
    act(() => { result.current.playCard(card2); });

    expect(result.current.hand.length).toBe(6);
  });

});