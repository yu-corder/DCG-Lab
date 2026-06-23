// frontend/tests/integration/hooks/useGameState.test.ts
import { describe, it, expect, mock } from "bun:test";
import { renderHook, waitFor } from "@testing-library/react";
import { useGameState } from "../../../src/hooks/useGameState";
import { albert } from "../../../../backend/decks";

globalThis.fetch = mock(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        cards: albert || [],
        myLeader: 'Royal',
        enemyLeader: 'Royal',
        token: [],
      }),
  } as Response)
) as any;

describe("useGameState", () => {
  it("should initialize game state correctly", async () => {
    const { result } = renderHook(() => useGameState());

    await waitFor(() => {
      expect(result.current.hand.length).toBe(4);
    });

    expect(result.current.turn).toBe(1);
    expect(result.current.isMulligan).toBe(true);
  });
});