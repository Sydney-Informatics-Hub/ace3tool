import { describe, test, expect } from "vitest";
import { Data } from "@/lib/logistic";
import {
  DataSummary,
  get_extreme_scores,
  get_z_scores,
} from "@/app/_model/model";
import real_data_with_total from "@/app/_model/data_summary_v1.json";
import * as _ from "radash";

const control_data_summary = {
  sds: _.omit(real_data_with_total.control_sds, ["total"]),
  means: _.omit(real_data_with_total.control_means, ["total"]),
};
const dementia_data_summary = {
  sds: _.omit(real_data_with_total.dementia_sds, ["total"]),
  means: _.omit(real_data_with_total.dementia_means, ["total"]),
};

describe("Identifying extreme scores", () => {
  test("We can calculate z-scores for each predictor", () => {
    const data_summary: DataSummary<"a" | "b" | "c"> = {
      means: { a: 5, b: 10, c: 20 },
      sds: { a: 1, b: 2, c: 3 },
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
      means: { a: 5, b: 10, c: 20 },
      sds: { a: 1, b: 2, c: 3 },
    };
    const data: Data<"a" | "b" | "c"> = {
      a: 2,
      b: 12,
      c: 20,
    };
    //
    const expected_diffs = [{ predictor: "a", diff: -4, other_predictor: "b" }];
    const extreme_scores = get_extreme_scores(data, data_summary, -2);
    expect(extreme_scores).toEqual(expected_diffs);
  });
});

describe("Test on actual data from our sample", () => {
  test("Low attention compared to memory etc.", () => {
    const data = {
      attention: 8,
      memory: 23,
      fluency: 9,
      language: 20,
      visuospatial: 11,
    };
    const z_scores = get_z_scores(data, control_data_summary);
    const extreme_scores = get_extreme_scores(data, control_data_summary, -5);
    expect(extreme_scores).toHaveLength(2);
    const attention = extreme_scores.filter(
      (item) => item.predictor === "attention"
    )[0];
    expect(attention.predictor).toEqual("attention");
    expect(attention.other_predictor).toEqual("memory");
    expect(attention.diff).toBeLessThan(-5);
  });
  test("Low attention compared to memory etc., based on dementia mean/sd", () => {
    const data = {
      attention: 8,
      memory: 23,
      fluency: 9,
      language: 20,
      visuospatial: 11,
    };
    const z_scores = get_z_scores(data, dementia_data_summary);
    const extreme_scores = get_extreme_scores(data, dementia_data_summary, -2);
    const attention = extreme_scores.filter(
      (item) => item.predictor === "attention"
    )[0];
    expect(attention.predictor).toEqual("attention");
    expect(attention.other_predictor).toEqual("memory");
    expect(attention.diff).toBeLessThan(-2);
  });
});
