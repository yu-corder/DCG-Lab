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
  it("should confirm mulligan and start the first turn", async () => {
    const { result } = renderHook(() => useGameState());

    await waitFor(() => {
      expect(result.current.hand.length).toBe(4);
    });

    const cardsToReplace = [result.current.hand[0], result.current.hand[1]];
    const initialHandIds = result.current.hand.map(c => c.instanceId);

    act(() => {
      result.current.handleMulliganConfirm(cardsToReplace);
    });

    expect(result.current.isMulligan).toBe(false);
    expect(result.current.hand.length).toBe(5);
  });
});