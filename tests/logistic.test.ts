import { create, all } from "mathjs";
import { describe, test, expect } from "vitest";
import {
  Model,
  Data,
  predict,
  confidence_interval,
  qnorm,
} from "@/lib/logistic";

const math = create(all);

test("qnorm returns expected values", () => {
  expect(qnorm(0.975)).toBeCloseTo(1.959964, 7);
});

describe("Logistic regression", () => {
  test("We can do a basic probability prediction", () => {
    // Example from wikipedia: https://en.wikipedia.org/wiki/Logistic_regression#Predictions
    const model: Model = {
      coefs: {
        intercept: -4.1,
        coefs: { study_hours: 1.5 },
      },
    };
    const data1: Data = { study_hours: 2 };
    const prob1 = predict(model, data1);
    // Wikipedia only gives these to 2 decimal points
    expect(prob1).toBeCloseTo(0.25, 2);

    const data2: Data = { study_hours: 4 };
    const prob2 = predict(model, data2);
    expect(prob2).toBeCloseTo(0.87, 2);
  });

  // Currently getting these results/examples from a standalone python script,
  //   explore how to generate examples more easily
  test("More involved example with multiple predictors", () => {
    const model: Model = {
      coefs: {
        intercept: -3.4495483976684698,
        coefs: {
          gre: 0.002293959504444253,
          gpa: 0.7770135737198534,
          rank: -0.5600313868499884,
        },
      },
    };

    const data1: Data = { gre: 800.0, gpa: 4.0, rank: 1.0 };
    const expected_prob1 = 0.7178136069045331;
    const prob1 = predict(model, data1);
    // TODO: work out what level of precision we need and what we can achieve
    expect(prob1).toBeCloseTo(expected_prob1, 7);
  });

  test("We can predict with prediction intervals", () => {
    const model: Model = {
      coefs: {
        intercept: -3.4495483976684698,
        coefs: {
          gre: 0.002293959504444253,
          gpa: 0.7770135737198534,
          rank: -0.5600313868499884,
        },
      },
    };
    const vcov = math.matrix([
      [
        1.2833400790865244, -0.00031537768873402824, -0.29029115578663295,
        -0.03517198874219694,
      ],
      [
        -0.00031537768873402824, 1.1921126102939763e-6, -0.0001227752155915835,
        7.727229745652387e-6,
      ],
      [
        -0.29029115578663295, -0.0001227752155915835, 0.10724569067598817,
        -0.001981510705975415,
      ],
      [
        -0.03517198874219694, 7.727229745652387e-6, -0.001981510705975415,
        0.01616381401554067,
      ],
    ]);
    const data1: Data = { gre: 800.0, gpa: 4.0, rank: 1.0 };
    const expected_ci = [0.58409564, 0.82166586];
    const expected_ci50 = [0.67463308, 0.75732489];
    const se = confidence_interval(model, vcov, data1);
    expect(se[0]).toBeCloseTo(expected_ci[0], 5);
    expect(se[1]).toBeCloseTo(expected_ci[1], 5);
    const ci50 = confidence_interval(model, vcov, data1, 0.5);
    expect(ci50[0]).toBeCloseTo(expected_ci50[0], 5);
    expect(ci50[1]).toBeCloseTo(expected_ci50[1], 5);
  });
});
