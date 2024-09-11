import { describe, test, expect } from "vitest";
import { Data } from "@/lib/logistic";
import {
  DataSummary,
  get_extreme_scores,
  get_z_scores,
} from "@/app/_model/model";
import real_data_with_total from "@/app/_model/data_summary_v1.json";
import * as _ from "radash";

const real_data_summary = {
  control_sds: _.omit(real_data_with_total.control_sds, ["total"]),
  control_means: _.omit(real_data_with_total.control_means, ["total"]),
};
// TODO: this shouldn't be "control" if we want to base it on dementia
const dementia_data_summary = {
  control_sds: _.omit(real_data_with_total.dementia_sds, ["total"]),
  control_means: _.omit(real_data_with_total.dementia_means, ["total"]),
};

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

describe("Test on actual data from our sample", () => {
  test("Low attention compared to memory etc.", () => {
    const data = {
      attention: 8,
      memory: 23,
      fluency: 9,
      language: 20,
      visuospatial: 11,
    };
    const z_scores = get_z_scores(data, real_data_summary);
    console.log(z_scores);
    const extreme_scores = get_extreme_scores(data, real_data_summary, -5);
    expect(extreme_scores).toHaveProperty("attention");
    expect(extreme_scores.attention.predictor).toEqual("memory");
    expect(extreme_scores.attention.diff).toBeLessThan(-5);
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
    expect(extreme_scores).toHaveProperty("attention");
    expect(extreme_scores.attention.predictor).toEqual("memory");
    expect(extreme_scores.attention.diff).toBeLessThan(-2);
  });
});
