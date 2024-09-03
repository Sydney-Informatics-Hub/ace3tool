import { describe, test, expect } from "vitest";
import { Data } from "@/lib/logistic";
import {
  DataSummary,
  get_extreme_scores,
  get_z_scores,
} from "@/app/_model/model";

describe("Identifying extreme scores", () => {
  test("We can calculate z-scores for each predictor", () => {
    const data_summary: DataSummary<"a" | "b" | "c"> = {
      control_means: { a: 5, b: 10, c: 20 },
      control_sds: { a: 1, b: 2, c: 3 },
    };
    const data: Data<"a" | "b" | "c"> = {
      a: 2,
      b: 12,
      c: 20,
    };
    const expected_z_scores = {
      a: -3,
      b: 1,
      c: 0,
    };
    const z_scores = get_z_scores(data, data_summary);

    expect(z_scores).toEqual(expected_z_scores);
  });

  test("We can find the biggest differences in z-scores for each predictor", () => {
    const data_summary: DataSummary<"a" | "b" | "c"> = {
      control_means: { a: 5, b: 10, c: 20 },
      control_sds: { a: 1, b: 2, c: 3 },
    };
    const data: Data<"a" | "b" | "c"> = {
      a: 2,
      b: 12,
      c: 20,
    };
    //
    const expected_diffs = {
      a: { predictor: "b", diff: -4 },
    };
    const extreme_scores = get_extreme_scores(data, data_summary, -2);
    expect(extreme_scores).toEqual(expected_diffs);
  });
});
