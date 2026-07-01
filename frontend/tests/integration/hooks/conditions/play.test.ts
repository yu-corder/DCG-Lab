import { describe, it, expect, mock, beforeEach } from "bun:test";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useGameState } from "../../../../src/hooks/useGameState";
import { testDeck_16, testDeck_22 } from "../../deck";

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

  it("should enter targeting context only when combo condition is satisfied for selective effects", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () => Promise.resolve({ cards: testDeck_22, myLeader: 'Royal', enemyLeader: 'Royal', token: [] }),
      } as Response)
    ) as any;

    const { result } = renderHook(() => useGameState());
    await waitFor(() => { expect(result.current.hand.length).toBe(4); });
    
    act(() => { result.current.handleMulliganConfirm([]); });

    act(() => {
      result.current.endTurn();
    });

    const card1 = result.current.hand[0];
    act(() => {
      result.current.playCard(card1);
    });

    act(() => { result.current.enemyPlayCard(); });

    expect(result.current.targetingContext).toBeNull();
    expect(result.current.field.some(c => c.instanceId === card1.instanceId)).toBe(true);

    const card2 = result.current.hand.find(c => c.instanceId !== card1.instanceId);
    expect(card2).toBeDefined();

    act(() => {
      result.current.playCard(card2!);
    });

    expect(result.current.targetingContext).not.toBeNull();
    expect(result.current.targetingContext?.card.instanceId).toBe(card2!.instanceId);
    expect(result.current.targetingContext?.effectType).toBe('SelectDestroy');

    expect(result.current.field.some(c => c.instanceId === card2!.instanceId)).toBe(false);
  });

});