// frontend/tests/integration/hooks/useGameState/turnEndEffect.test.ts
import { describe, it, expect, mock } from "bun:test";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useGameState } from "../../../../src/hooks/useGameState";
import { token } from '../../../../../backend/token.ts';
import { testDeck_31 } from "../../deck"; 

describe("TurnEnd Effect via endTurn", () => {
  it("should trigger TurnEnd effect and update game state when the turn ends", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            cards: testDeck_31,
            myLeader: 'Elf',
            enemyLeader: 'Royal',
            token: token,
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

    const amuletCard = result.current.hand[0];
    act(() => {
      result.current.playCard(amuletCard);
    });
    expect(result.current.field.length).toBe(1);

    const handLengthBeforeFirstEnd = result.current.hand.length;

    act(() => {
      result.current.endTurn();
    });

    expect(result.current.hand.length).toBe(handLengthBeforeFirstEnd + 1);

    const card1 = result.current.hand[0];
    const card2 = result.current.hand[1];
    const card3 = result.current.hand[2];

    act(() => {
      result.current.playCard(card1);
    });
    act(() => {
      result.current.playCard(card2);
    });
    
    const handLengthBeforeComboEnd = result.current.hand.length;

    act(() => {
      result.current.playCard(card3);
    });

    act(() => {
      result.current.endTurn();
    });

    expect(result.current.hand.length).toBe(handLengthBeforeComboEnd - 1 + 2);

  });
});