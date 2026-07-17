import { describe, it, expect, mock } from "bun:test";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useGameState } from "../../../../src/hooks/useGameState";
import { testDeck_32 } from "../../deck";
import { token } from '../../../../../backend/token.ts';

describe("Play Act Effect Workflow", () => {
  it("should consume PP, destroy self, and bounce the selected card when playAct is executed", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            cards: testDeck_32,
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

    act(() => {
      result.current.endTurn();
    });


    const cardA = result.current.hand[0];
    const cardB = result.current.hand[1];

    expect(cardA).toBeDefined();
    expect(cardB).toBeDefined();

    act(() => {
      result.current.playCard(cardA);
    });
    act(() => {
      result.current.playCard(cardB);
    });

    expect(result.current.field.length).toBe(2);

    act(() => {
      result.current.endTurn();
    });
    
    act(() => {
      result.current.enemyPlayCard();
    });

    const ppBeforeAct = result.current.pp;
    const handLengthBeforeAct = result.current.hand.length;

    const activeCardA = result.current.field.find(c => c.instanceId === cardA.instanceId)!;
    const activeCardB = result.current.field.find(c => c.instanceId === cardB.instanceId)!;

    act(() => {
      result.current.playAct(activeCardA);
    });

    expect(result.current.pp).toBe(ppBeforeAct - 1);

    expect(result.current.field.some(c => c.instanceId === activeCardA.instanceId)).toBe(false);
    expect(result.current.field.length).toBe(1);

    expect(result.current.targetingContext).not.toBeNull();
    expect(result.current.targetingContext?.effectType).toBe("SelectBounce");

    const targetIndexOnField = result.current.field.findIndex(c => c.instanceId === activeCardB.instanceId);
    
    act(() => {
      result.current.selectTargetCard(targetIndexOnField);
    });

    expect(result.current.targetingContext).toBeNull();

    expect(result.current.field.length).toBe(0);
    expect(result.current.hand.length).toBe(handLengthBeforeAct + 1);
    expect(result.current.hand.some(c => c.instanceId === activeCardB.instanceId)).toBe(true);
  });
});