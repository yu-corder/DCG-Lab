// frontend/tests/integration/effects/fanfareAoe.test.ts
import { describe, it, expect, mock } from "bun:test";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useGameState } from "../../../../src/hooks/useGameState";
import { testDeck_2, testDeck_3, testDeck_4, testDeck_5, testDeck_6, testDeck_7, testDeck_19, testDeck_21, testDeck_23, testDeck_24 } from "../../deck";
import { token } from '../../../../../backend/token.ts';

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
      result.current.selectTargetCard(0);
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
      result.current.selectTargetCard(0);
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

  it("should heal my leader health by 3 when heal fanfare follower is played", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            cards: testDeck_6,
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
      result.current.damageMyLeader(5);
    });
    expect(result.current.myHealth).toBe(15);

    const playableCard = result.current.hand[0];
    act(() => {
      result.current.playCard(playableCard);
    });

    expect(result.current.myHealth).toBe(19);
    expect(result.current.targetingContext).toBeNull();
    expect(result.current.field.some(c => c.instanceId === playableCard.instanceId)).toBe(true);

    act(() => {
      result.current.endTurn();
    });

    const playableCard2 = result.current.hand[0];
    act(() => {
      result.current.playCard(playableCard2);
    });
    expect(result.current.myHealth).toBe(20);

  });

  it("should add 2 token cards to hand when token generation fanfare follower is played", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            cards: testDeck_7,
            myLeader: 'Royal',
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

    const playableCard = result.current.hand[0];

    act(() => {
      result.current.playCard(playableCard);
    });

    expect(result.current.hand.length).toBe(6);

    const lastTwoCards = result.current.hand.slice(-2);
    
    lastTwoCards.forEach(card => {
      expect(card.id).toBe(1);
      expect(card.name).toBe('フェアリー');
      expect(card.instanceId).toBeDefined();
    });

    expect(lastTwoCards[0].instanceId).not.toBe(lastTwoCards[1].instanceId);

    expect(result.current.targetingContext).toBeNull();
  });

  it("should apply buff to self based on the current combo count when combo stats buff follower is played", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            cards: testDeck_19,
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
      result.current.endTurn();
    });

    const firstComboCard = result.current.hand[0];
    const initialAttack = firstComboCard.attack ? firstComboCard.attack : 0;

    act(() => {
      result.current.playCard(firstComboCard);
    });

    const deployedCard1 = result.current.field.find(c => c.instanceId === firstComboCard.instanceId);
    expect(deployedCard1).toBeDefined();
    expect(deployedCard1!.attack).toBe(initialAttack + 1);

    const secondComboCard = result.current.hand[0];

    act(() => {
      result.current.playCard(secondComboCard);
    });

    const deployedCard2 = result.current.field.find(c => c.instanceId === secondComboCard.instanceId);
    expect(deployedCard2).toBeDefined();
    expect(deployedCard2!.attack).toBe(initialAttack + 2);

    expect(result.current.field.length).toBe(2);
    expect(result.current.targetingContext).toBeNull();
  });

  it("should apply buff to self based on the count of its own subtype in hand when played", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            cards: testDeck_21,
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

    const playableCard = result.current.hand[0];

    act(() => {
      result.current.playCard(playableCard);
    });

    const expectedBuffAmount = result.current.hand.length;

    const deployedCard = result.current.field.find(c => c.instanceId === playableCard.instanceId);
    expect(deployedCard).toBeDefined();
    expect(deployedCard!.attack).toBe(expectedBuffAmount);
    expect(deployedCard!.defense).toBe(expectedBuffAmount);
  });

  it("should fix enemy follower's defense to 1 when combo 3 condition is satisfied", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            cards: testDeck_23,
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

    act(() => { result.current.endTurn(); });
    act(() => { result.current.endTurn(); });
    act(() => { result.current.endTurn(); });

    act(() => { result.current.enemyPlayCard(); }); 
    
    expect(result.current.enemyField.length).toBeGreaterThan(0);
    const targetEnemyCard = result.current.enemyField[0];
    expect(targetEnemyCard.defense).toBeGreaterThan(1);

    const card1 = result.current.hand[0];
    act(() => { result.current.playCard(card1); });

    expect(result.current.targetingContext).toBeNull();

    const card2 = result.current.hand.find(c => c.instanceId !== card1.instanceId);
    act(() => { result.current.playCard(card2!); });

    const amatsuAlbert = result.current.hand.find(c => c.instanceId !== card1.instanceId && c.instanceId !== card2!.instanceId);
    expect(amatsuAlbert).toBeDefined();

    act(() => {
      result.current.playCard(amatsuAlbert!);
    });

    expect(result.current.targetingContext).not.toBeNull();
    expect(result.current.targetingContext?.effectType).toBe('SelectStatsFix');

    act(() => {
      result.current.selectTargetCard(0);
    });

    const updatedEnemyCard = result.current.enemyField[0];
    expect(updatedEnemyCard.defense).toBe(1);
    expect(updatedEnemyCard.baseDefense).toBe(targetEnemyCard.baseDefense);
    expect(result.current.targetingContext).toBeNull();
  });

  it("should bounce the selected friendly follower back to hand on play while keeping the source follower on the field", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            cards: testDeck_24,
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

    const targetFriendlyCard = result.current.hand[0];
    act(() => {
      result.current.playCard(targetFriendlyCard);
    });
    expect(result.current.targetingContext).toBeNull();
    expect(result.current.field.length).toBe(1);
    expect(result.current.field[0].instanceId).toBe(targetFriendlyCard.instanceId);

    act(() => { result.current.endTurn(); });
    act(() => { result.current.endTurn(); });

    const bounceFollowerCard = result.current.hand[0];
    act(() => {
      result.current.playCard(bounceFollowerCard);
    });

    expect(result.current.targetingContext).not.toBeNull();
    expect(result.current.targetingContext?.effectType).toBe('SelectBounce');
    expect(result.current.targetingContext?.targetTeam).toBe('my');

    const handLengthBeforeBounce = result.current.hand.length;

    act(() => {
      result.current.selectTargetCard(0);
    });

    expect(result.current.field.some(c => c.instanceId === targetFriendlyCard.instanceId)).toBe(false);
    
    expect(result.current.hand.length).toBe(handLengthBeforeBounce);
    expect(result.current.hand[result.current.hand.length - 1].instanceId).toBe(targetFriendlyCard.instanceId);

    expect(result.current.field.some(c => c.instanceId === bounceFollowerCard.instanceId)).toBe(true);
    expect(result.current.targetingContext).toBeNull();
  });
});