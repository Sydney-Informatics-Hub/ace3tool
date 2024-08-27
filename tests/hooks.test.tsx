import { describe, test, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useValidatedScores } from "@/app/_hooks/useValidatedScores";
import { useTotalScore } from "@/app/_hooks/useTotalScore";

describe("Validated scores hook", () => {
  test("Returns invalid for incomplete scores", () => {
    const { result } = renderHook(() => useValidatedScores({ attention: 5 }));
    expect(result.current.valid).toBe(false);
  });

  test("Returns valid for complete scores", async () => {
    const valid_scores = {
      attention: 5,
      fluency: 5,
      memory: 5,
      language: 5,
      visuospatial: 5,
    };
    const { result } = renderHook(() => useValidatedScores(valid_scores));
    // Validation is async, so wait for it to complete
    await waitFor(() => expect(result.current.valid).toBe(true));
    expect(result.current.scores).toEqual(valid_scores);
  });
});

describe("Total scores hook", () => {
  test("Returns invalid for incomplete scores", () => {
    const { result } = renderHook(() => useTotalScore({ attention: 5 }));
    expect(result.current.valid).toBe(false);
    expect(result.current.total).toBe(0);
  });

  test("Returns total for complete scores", async () => {
    const valid_scores = {
      attention: 5,
      fluency: 5,
      memory: 5,
      language: 5,
      visuospatial: 5,
    };
    const { result } = renderHook(() => useTotalScore(valid_scores));
    // Validation is async, so wait for it to complete
    await waitFor(() => expect(result.current.valid).toBe(true));
    expect(result.current.total).toEqual(25);
  });
});
