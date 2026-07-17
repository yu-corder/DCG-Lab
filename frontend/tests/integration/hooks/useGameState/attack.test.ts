import { describe, it, expect, mock } from "bun:test";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useGameState } from "../../../../src/hooks/useGameState";
import { testDeck_9 } from "../../deck";

describe("Combat System", () => {
  it("should handle attacking enemy followers and enemy leader correctly", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            cards: testDeck_9,
            myLeader: 'Royal',
            enemyLeader: 'Royal',
            token: [],
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

    const myFollower = result.current.hand[0];
    act(() => {
      result.current.playCard(myFollower);
    });
    const myFollowerId = result.current.field[0].instanceId!;

    act(() => {
      result.current.enemyPlayCard();
    });
    expect(result.current.enemyField.length).toBe(1);
    const enemyFollowerId = result.current.enemyField[0].instanceId!;

    act(() => {
      result.current.attackToFollower(myFollowerId, enemyFollowerId);
    });

    //ここで攻撃できているなら、最後の相手リーダヘルスの計算で狂う
    act(() => {
      result.current.attackToLeader(myFollowerId);
    });

    const postAttackMyFollower = result.current.field.find(c => c.instanceId === myFollowerId)!;
    const postAttackEnemyFollower = result.current.enemyField.find(c => c.instanceId === enemyFollowerId)!;

    expect(postAttackMyFollower.defense).toBe(1);
    expect(postAttackEnemyFollower.defense).toBe(1);

    act(() => { result.current.endTurn(); });
    act(() => { result.current.endTurn(); });

    expect(result.current.enemyHealth).toBe(20);

    act(() => {
      result.current.attackToLeader(myFollowerId);
    });

    expect(result.current.enemyHealth).toBe(19);
  });
});