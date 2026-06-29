import { describe, it, expect, mock, beforeEach } from "bun:test";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useGameState } from "../../../../src/hooks/useGameState";
import { testDeck_10, testDeck_11, testDeck_12, testDeck_13, testDeck_14, testDeck_15 } from "../../deck";
import { token } from '../../../../../backend/token.ts';

describe("Evolve Effect", () => {
  beforeEach(() => {
    globalThis.alert = mock(() => {});
  });

  it("should draw 2 cards from deck when draw evolve follower is evolved", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () => Promise.resolve({ cards: testDeck_10, myLeader: 'Royal', enemyLeader: 'Royal', token: [] }),
      } as Response)
    ) as any;

    const { result } = renderHook(() => useGameState());
    await waitFor(() => { expect(result.current.hand.length).toBe(4); });
    act(() => { result.current.handleMulliganConfirm([]); });

    const playableCard = result.current.hand[0];
    act(() => { result.current.playCard(playableCard); });
    const followerId = result.current.field[0].instanceId!;

    expect(result.current.hand.length).toBe(4);

    act(() => { result.current.endTurn(); });
    act(() => { result.current.endTurn(); });
    act(() => { result.current.endTurn(); });

    act(() => { result.current.evolveFollower(followerId); });

    expect(result.current.hand.length).toBe(9);
    expect(result.current.targetingContext).toBeNull();
  });

  it("should deal 1 damage to all enemy followers upon evolution", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () => Promise.resolve({ cards: testDeck_11, myLeader: 'Royal', enemyLeader: 'Royal', token: [] }),
      } as Response)
    ) as any;

    const { result } = renderHook(() => useGameState());
    await waitFor(() => { expect(result.current.hand.length).toBe(4); });
    act(() => { result.current.handleMulliganConfirm([]); });

    const playableCard = result.current.hand[0];
    act(() => { result.current.playCard(playableCard); });
    const followerId = result.current.field[0].instanceId!;

    act(() => { result.current.enemyPlayCard(); });
    act(() => { result.current.enemyPlayCard(); });
    expect(result.current.enemyField.length).toBe(2);

    act(() => { result.current.endTurn(); });
    act(() => { result.current.endTurn(); });
    act(() => { result.current.endTurn(); });

    act(() => { result.current.evolveFollower(followerId); });

    expect(result.current.enemyField.length).toBe(2);
    expect(result.current.enemyField[0].defense).toBe(1);
    expect(result.current.enemyField[1].defense).toBe(1);
  });

  it("should enter targeting mode on evolution and deal damage to selected enemy", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () => Promise.resolve({ cards: testDeck_12, myLeader: 'Royal', enemyLeader: 'Royal', token: [] }),
      } as Response)
    ) as any;

    const { result } = renderHook(() => useGameState());
    await waitFor(() => { expect(result.current.hand.length).toBe(4); });
    act(() => { result.current.handleMulliganConfirm([]); });

    const playableCard = result.current.hand[0];
    act(() => { result.current.playCard(playableCard); });
    const followerId = result.current.field[0].instanceId!;

    act(() => { result.current.enemyPlayCard(); });

    act(() => { result.current.endTurn(); });
    act(() => { result.current.endTurn(); });
    act(() => { result.current.endTurn(); });

    act(() => { result.current.evolveFollower(followerId); });

    expect(result.current.targetingContext).not.toBeNull();
    expect(result.current.targetingContext?.effectType).toBe("SelectDamage");

    act(() => { result.current.selectTargetFollower(0); });
    expect(result.current.enemyField.length).toBe(0);
    expect(result.current.targetingContext).toBeNull();
  });

  it("should enter targeting mode on evolution and instantly destroy selected enemy", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () => Promise.resolve({ cards: testDeck_13, myLeader: 'Royal', enemyLeader: 'Royal', token: [] }),
      } as Response)
    ) as any;

    const { result } = renderHook(() => useGameState());
    await waitFor(() => { expect(result.current.hand.length).toBe(4); });
    act(() => { result.current.handleMulliganConfirm([]); });

    const playableCard = result.current.hand[0];
    act(() => { result.current.playCard(playableCard); });
    const followerId = result.current.field[0].instanceId!;

    act(() => { result.current.enemyPlayCard(); });

    act(() => { result.current.endTurn(); });
    act(() => { result.current.endTurn(); });
    act(() => { result.current.endTurn(); });

    act(() => { result.current.evolveFollower(followerId); });

    expect(result.current.targetingContext?.effectType).toBe("SelectDestroy");

    act(() => { result.current.selectTargetFollower(0); });
    expect(result.current.enemyField.length).toBe(0);
    expect(result.current.targetingContext).toBeNull();
  });

  it("should heal my leader health by 3 upon evolution", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () => Promise.resolve({ cards: testDeck_14, myLeader: 'Royal', enemyLeader: 'Royal', token: [] }),
      } as Response)
    ) as any;

    const { result } = renderHook(() => useGameState());
    await waitFor(() => { expect(result.current.hand.length).toBe(4); });
    act(() => { result.current.handleMulliganConfirm([]); });

    act(() => { result.current.damageMyLeader(5); });
    expect(result.current.myHealth).toBe(15);

    const playableCard = result.current.hand[0];
    act(() => { result.current.playCard(playableCard); });
    const followerId = result.current.field[0].instanceId!;

    act(() => { result.current.endTurn(); });
    act(() => { result.current.endTurn(); });
    act(() => { result.current.endTurn(); });

    act(() => { result.current.evolveFollower(followerId); });

    expect(result.current.myHealth).toBe(18);
  });

  it("should add 2 token cards to hand upon evolution", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () => Promise.resolve({ cards: testDeck_15, myLeader: 'Royal', enemyLeader: 'Royal', token: token }),
      } as Response)
    ) as any;

    const { result } = renderHook(() => useGameState());
    await waitFor(() => { expect(result.current.hand.length).toBe(4); });
    act(() => { result.current.handleMulliganConfirm([]); });

    const playableCard = result.current.hand[0];
    act(() => { result.current.playCard(playableCard); });
    const followerId = result.current.field[0].instanceId!;

    const handCountBeforeEvolve = result.current.hand.length + 3;

    act(() => { result.current.endTurn(); });
    act(() => { result.current.endTurn(); });
    act(() => { result.current.endTurn(); });

    act(() => { result.current.evolveFollower(followerId); });

    expect(result.current.hand.length).toBe(handCountBeforeEvolve + 2);

    const lastTwoCards = result.current.hand.slice(-2);
    lastTwoCards.forEach(card => {
      expect(card.id).toBe(1);
      expect(card.name).toBe('フェアリー');
      expect(card.instanceId).toBeDefined();
    });
    expect(lastTwoCards[0].instanceId).not.toBe(lastTwoCards[1].instanceId);
  });
});