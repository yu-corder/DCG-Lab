import { describe, it, expect, mock } from "bun:test";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useGameState } from "../../../../src/hooks/useGameState";
import { testDeck_28 } from "../../deck";
import { token } from '../../../../../backend/token.ts';

describe("LastWord Effect via Combat", () => {
  it("should trigger LastWord and add a token to hand when the follower is destroyed in combat on the next turn", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            cards: testDeck_28,
            myLeader: 'Elf',
            enemyLeader: 'Royal',
            token: token,
            crest: []
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

    const lwCard = result.current.hand[0];
    act(() => {
      result.current.playCard(lwCard);
    });
    expect(result.current.field.length).toBe(1);

    act(() => {
      result.current.endTurn();
    });
    
    act(() => {
      result.current.enemyPlayCard();
    });

    expect(result.current.field.length).toBe(1);
    expect(result.current.enemyField.length).toBe(1);

    const handLengthBeforeDeath = result.current.hand.length;
    const myFollowerInstanceId = result.current.field[0].instanceId!;
    const enemyFollowerInstanceId = result.current.enemyField[0].instanceId!;

    act(() => {
      result.current.attackToFollower(myFollowerInstanceId, enemyFollowerInstanceId);
    });

    expect(result.current.field.length).toBe(0);
    expect(result.current.enemyField.length).toBe(0);
    expect(result.current.hand.length).toBe(handLengthBeforeDeath + 1);
  });
});