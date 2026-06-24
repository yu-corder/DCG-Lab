// frontend/tests/integration/effects/fanfareAoe.test.ts
import { describe, it, expect, mock } from "bun:test";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useGameState } from "../../../../src/hooks/useGameState";
import { testDeck_2, testDeck_3, testDeck_4, testDeck_5 } from "../../deck";

describe("Fanfare Effect", () => {
  it("should deal 1 damage to all enemy followers and they should survive with 1 defense", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            cards: testDeck_2,
            myLeader: 'Royal',
            enemyLeader: 'Royal',
            token: [],
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

    act(() => {
      result.current.enemyPlayCard();
    });
    act(() => {
      result.current.enemyPlayCard();
    });

    expect(result.current.enemyField.length).toBe(2);
    expect(result.current.enemyField[0].defense).toBe(2);
    expect(result.current.enemyField[1].defense).toBe(2);

    const playableAoeCard = result.current.hand[0];
    
    act(() => {
      result.current.playCard(playableAoeCard);
    });

    expect(result.current.enemyField.length).toBe(2);
    expect(result.current.enemyField[0].defense).toBe(1);
    expect(result.current.enemyField[1].defense).toBe(1);
    expect(result.current.field.some(c => c.instanceId === playableAoeCard.instanceId)).toBe(true);

    act(() => {
      result.current.endTurn();
    });

    const playableAoeCard2 = result.current.hand[0];
    
    act(() => {
      result.current.playCard(playableAoeCard2);
    });

    expect(result.current.enemyField.length).toBe(0);
  });

  it("should enter targeting mode on play, and deal damage to the selected enemy when target is chosen", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            cards: testDeck_3,
            myLeader: 'Royal',
            enemyLeader: 'Royal',
            token: [],
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

    act(() => {
      result.current.enemyPlayCard();
    });
    expect(result.current.enemyField.length).toBe(1);
    expect(result.current.enemyField[0].defense).toBe(2);

    const playableCard = result.current.hand[0];
    act(() => {
      result.current.playCard(playableCard);
    });

    expect(result.current.targetingContext).not.toBeNull();
    expect(result.current.targetingContext?.effectType).toBe("SelectDamage");

    act(() => {
      result.current.selectTargetFollower(0);
    });

    expect(result.current.enemyField.length).toBe(0);
    expect(result.current.targetingContext).toBeNull();
    expect(result.current.field.some(c => c.instanceId === playableCard.instanceId)).toBe(true);
  });

  it("should enter targeting mode on play, and instantly destroy the selected enemy regardless of its defense", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            cards: testDeck_4,
            myLeader: 'Royal',
            enemyLeader: 'Royal',
            token: [],
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
    act(() => {
      result.current.enemyPlayCard();
    });
    expect(result.current.enemyField.length).toBe(1);
    expect(result.current.enemyField[0].defense).toBe(5);

    const playableCard = result.current.hand[0];
    act(() => {
      result.current.playCard(playableCard);
    });

    expect(result.current.targetingContext).not.toBeNull();
    expect(result.current.targetingContext?.effectType).toBe("SelectDestroy");

    act(() => {
      result.current.selectTargetFollower(0);
    });

    expect(result.current.enemyField.length).toBe(0);
    expect(result.current.targetingContext).toBeNull();
    expect(result.current.field.some(c => c.instanceId === playableCard.instanceId)).toBe(true);
  });

  it("should draw 2 cards from deck when draw fanfare follower is played", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            cards: testDeck_5,
            myLeader: 'Royal',
            enemyLeader: 'Royal',
            token: [],
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
    expect(result.current.hand.length).toBe(5);
    const playableCard = result.current.hand[0];

    act(() => {
      result.current.playCard(playableCard);
    });

    expect(result.current.hand.length).toBe(7);
    expect(result.current.targetingContext).toBeNull();
    expect(result.current.field.some(c => c.instanceId === playableCard.instanceId)).toBe(true);
  });
});