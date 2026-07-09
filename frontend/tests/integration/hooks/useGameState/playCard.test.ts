// frontend/tests/integration/hooks/useGameState.test.ts
import { describe, it, expect, mock } from "bun:test";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useGameState } from "../../../../src/hooks/useGameState";
import { testDeck_1, testDeck_20, testDeck_29, testDeck_30 } from "../../deck";
import { dummySpell } from "../../testCard";


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

  it("should play a spell card, consuming PP and reducing hand without moving it to the field", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            cards: testDeck_20,
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

    const playableSpell = result.current.hand.find(c => c.type === 'Spell' && c.cost <= result.current.pp);
    
    if (!playableSpell) {
      throw new Error("テスト用のプレイ可能なスペルカード（コスト1以下）が手札にありません。");
    }

    const targetCardId = playableSpell.instanceId;
    const initialPP = result.current.pp;
    const initialHandLength = result.current.hand.length;

    act(() => {
      result.current.playCard(playableSpell);
    });

    expect(result.current.pp).toBe(initialPP - playableSpell.cost);
    expect(result.current.hand.some(c => c.instanceId === targetCardId)).toBe(false);
    expect(result.current.field.length).toBe(0);
    expect(result.current.field.some(c => c.instanceId === targetCardId)).toBe(false);
  });

  it("should block playing a spell if it has a SelectBounce fanfare and my field is empty", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            cards: testDeck_29,
            myLeader: 'Elf',
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

    expect(result.current.field.length).toBe(0);

    act(() => {
      result.current.enemyPlayCard();
    });

    act(() => {
      result.current.playCard(dummySpell);
    });

    expect(result.current.targetingContext).toBeNull();

    const followerInHand = result.current.hand[0];
    act(() => {
      result.current.playCard(followerInHand);
    });
    expect(result.current.field.length).toBe(1);

    act(() => {
      result.current.playCard(dummySpell);
    });

    expect(result.current.targetingContext).not.toBeNull();
    expect(result.current.targetingContext?.effectType).toBe("SelectBounce");
    expect(result.current.targetingContext?.targetTeam).toBe("my");

    act(() => {
      result.current.selectTargetFollower(0);
    });

    expect(result.current.targetingContext).toBeNull();
    expect(result.current.enemyField.length).toBe(0);

  });

  it("should play an amulet card, consuming PP and moving it to the field", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            cards: testDeck_30, 
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

    const playableCard = result.current.hand.find(c => c.cost <= result.current.pp);
    const initialPP = result.current.pp;
    const initialHandLength = result.current.hand.length;

    if (!playableCard) {
      throw new Error("テスト用のプレイ可能なカード（コスト1以下）が手札にありません。デッキ構成を確認してください。");
    }

    act(() => {
      result.current.playCard(playableCard);
    });

    expect(result.current.pp).toBe(initialPP - playableCard.cost);
    expect(result.current.hand.length).toBe(initialHandLength - 1);
    expect(result.current.field.some(c => c.instanceId === playableCard.instanceId)).toBe(true);
  });
});