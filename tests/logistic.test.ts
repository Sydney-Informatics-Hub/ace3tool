import { describe, test, expect } from "vitest";
import { Data, qnorm, LogisticModel } from "@/lib/logistic";

test("qnorm returns expected values", () => {
  expect(qnorm(0.975)).toBeCloseTo(1.959964, 7);
});

describe("Logistic regression", () => {
  test("We can do a basic probability prediction", () => {
    // Example from wikipedia: https://en.wikipedia.org/wiki/Logistic_regression#Predictions
    const model = new LogisticModel({
      intercept: -4.1,
      coefs: { study_hours: 1.5 },
    });
    const data1: Data = { study_hours: 2 };
    const prob1 = model.predict(data1);
    // Wikipedia only gives these to 2 decimal points
    expect(prob1).toBeCloseTo(0.25, 2);

    const data2: Data = { study_hours: 4 };
    const prob2 = model.predict(data2);
    expect(prob2).toBeCloseTo(0.87, 2);
  });

  // Currently getting these results/examples from a standalone python script,
  //   explore how to generate examples more easily
  test("More involved example with multiple predictors", () => {
    const model = new LogisticModel({
      intercept: -3.4495483976684698,
      coefs: {
        gre: 0.002293959504444253,
        gpa: 0.7770135737198534,
        rank: -0.5600313868499884,
      },
    });

    const data1: Data = { gre: 800.0, gpa: 4.0, rank: 1.0 };
    const expected_prob1 = 0.7178136069045331;
    const prob1 = model.predict(data1);
    // TODO: work out what level of precision we need and what we can achieve
    expect(prob1).toBeCloseTo(expected_prob1, 7);
  });

  test("Prediction interval throws error when vcov isn't provided", () => {
    const model = new LogisticModel({
      intercept: -4.1,
      coefs: { study_hours: 1.5 },
    });
    const data1: Data = { study_hours: 2 };
    expect(() => model.confidence_interval(data1)).toThrowError();
  });

  test("We can predict with prediction intervals", () => {
    // These values found by running a simple logistic regression
    //   model in Python
    const vcov = [
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
    ];
    const model = new LogisticModel(
      {
        intercept: -3.4495483976684698,
        coefs: {
          gre: 0.002293959504444253,
          gpa: 0.7770135737198534,
          rank: -0.5600313868499884,
        },
      },
      { vcov }
    );
    const data1: Data = { gre: 800.0, gpa: 4.0, rank: 1.0 };
    const expected_ci = [0.58409564, 0.82166586];
    const expected_ci50 = [0.67463308, 0.75732489];
    const se = model.confidence_interval(data1);
    expect(se[0]).toBeCloseTo(expected_ci[0], 5);
    expect(se[1]).toBeCloseTo(expected_ci[1], 5);
    const ci50 = model.confidence_interval(data1, 0.5);
    expect(ci50[0]).toBeCloseTo(expected_ci50[0], 5);
    expect(ci50[1]).toBeCloseTo(expected_ci50[1], 5);
  });
});
