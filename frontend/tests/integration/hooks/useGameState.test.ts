// frontend/tests/integration/hooks/useGameState.test.ts
import { describe, it, expect, mock } from "bun:test";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useGameState } from "../../../src/hooks/useGameState";
import { testDeck_1 } from "../deck";

globalThis.fetch = mock(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        cards: testDeck_1 || [],
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
      expect(result.current.turn).toBe(1);
      expect(result.current.isMulligan).toBe(true);
    });
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

  it("should play a follower card, consuming PP and moving it to the field", async () => {
    const { result } = renderHook(() => useGameState());

    await waitFor(() => {
      expect(result.current.hand.length).toBe(4);
    });

    act(() => {
      result.current.handleMulliganConfirm([]);
    });

    const playableCard = result.current.hand.find(c => c.cost <= result.current.pp);
    
    if (!playableCard) {
      throw new Error("テスト用のプレイ可能なカード（コスト1以下）が手札にありません。デッキ構成を確認してください。");
    }

    const targetCardId = playableCard.instanceId;
    const initialPP = result.current.pp;
    const initialHandLength = result.current.hand.length;
    const initialFieldLength = result.current.field.length;

    act(() => {
      result.current.playCard(playableCard);
    });

    expect(result.current.pp).toBe(initialPP - playableCard.cost);
    expect(result.current.hand.length).toBe(initialHandLength - 1);
    expect(result.current.hand.some(c => c.instanceId === targetCardId)).toBe(false);

    if (playableCard.type === 'Follower') {
      expect(result.current.field.length).toBe(initialFieldLength + 1);
      expect(result.current.field.some(c => c.instanceId === targetCardId)).toBe(true);
      const fieldedCard = result.current.field.find(c => c.instanceId === targetCardId);
      expect(fieldedCard?.playedThisTurn).toBe(true);
    }
  });
});