// frontend/tests/integration/hooks/useGameState.test.ts
import { describe, it, expect, mock } from "bun:test";
import { renderHook } from "@testing-library/react";
import { useGameState } from "../../../src/hooks/useGameState";

globalThis.fetch = mock(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        deck: [],
        hand: [],
      }),
  } as Response)
) as any;

describe("useGameState", () => {
  it("フックがエラーなく初期化できること", () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.turn).toBe(1);
    console.log(result.current);
  });
});