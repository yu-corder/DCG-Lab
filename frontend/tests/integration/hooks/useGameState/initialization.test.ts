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
  it("should initialize game state correctly", async () => {
    const { result } = renderHook(() => useGameState());

    await waitFor(() => {
      expect(result.current.hand.length).toBe(4);
      expect(result.current.turn).toBe(1);
      expect(result.current.isMulligan).toBe(true);
    });
  });
});