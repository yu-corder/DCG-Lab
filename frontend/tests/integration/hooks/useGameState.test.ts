// frontend/tests/integration/hooks/useGameState.test.ts
import { describe, it, expect, mock } from "bun:test";
import { renderHook, waitFor, act } from "@testing-library/react";
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
    expect(result.current.hand.some(c => c.instanceId === initialHandIds[0])).toBe(false);
    expect(result.current.hand.some(c => c.instanceId === initialHandIds[1])).toBe(false);
    expect(result.current.hand.length).toBe(5);
  });

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