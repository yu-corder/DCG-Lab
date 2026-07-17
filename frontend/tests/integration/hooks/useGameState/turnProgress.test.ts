// frontend/tests/integration/hooks/useGameState.test.ts
import { describe, it, expect, mock } from "bun:test";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useGameState } from "../../../../src/hooks/useGameState";
import { testDeck_1 } from "../../deck";

globalThis.fetch = mock(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        cards: testDeck_1 || [],
        myLeader: 'Royal',
        enemyLeader: 'Royal',
        token: [],
        crest: []
      }),
  } as Response)
) as any;

describe("useGameState", () => {
  it("should advance turn and refresh PP when turn ends", async () => {
    const { result } = renderHook(() => useGameState());

    await waitFor(() => {
      expect(result.current.hand.length).toBe(4);
    });

    act(() => {
      result.current.handleMulliganConfirm([]);
    });

    expect(result.current.turn).toBe(1);
    expect(result.current.pp).toBe(1);
    expect(result.current.maxPP).toBe(1);

    act(() => {
      result.current.endTurn();
    });

    expect(result.current.turn).toBe(2);
    expect(result.current.maxPP).toBe(2);
    expect(result.current.pp).toBe(2);
  });
});