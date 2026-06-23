// frontend/tests/integration/effects/fanfareAoe.test.ts
import { describe, it, expect, mock } from "bun:test";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useGameState } from "../../../../src/hooks/useGameState";
import { testDeck_2 } from "../../deck";

describe("Fanfare Effect - AoE Damage", () => {
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
});