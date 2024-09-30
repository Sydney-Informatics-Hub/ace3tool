import { Matrix } from "ml-matrix";
import erfinv from "@stdlib/math-base-special-erfinv";

export type ModelCoefs<predictors extends string = string> = {
  intercept: number;
  coefs: Record<predictors, number>;
};

export type Data<predictors extends string = string> = Readonly<
  Record<predictors, number>
>;

interface LogisticModelOptions<predictors extends string> {
  vcov?: number[][];
  center_predictors?: boolean;
  predictor_means?: Data<predictors>;
}

export function get_predictors<predictors extends string>(
  data: Data<predictors>
): predictors[] {
  return Object.keys(data) as predictors[];
}

export class LogisticModel<predictors extends string> {
  readonly predictors: predictors[];
  readonly coefs: ModelCoefs<predictors>;
  readonly vcov: Matrix | undefined;
  readonly center_predictors: boolean;
  readonly predictor_means: Data<predictors> | undefined;

  constructor(
    coefs: ModelCoefs<predictors>,
    options?: LogisticModelOptions<predictors>
  ) {
    this.predictors = get_predictors(coefs.coefs);
    this.coefs = coefs;
    this.vcov = options?.vcov ? new Matrix(options.vcov) : undefined;
    this.center_predictors = options?.center_predictors || false;
    this.predictor_means = options?.predictor_means || undefined;
  }

  private has_vcov(): this is this & { vcov: Matrix } {
    return this.vcov !== undefined;
  }

  private has_means(): this is this & { predictor_means: Data<predictors>[] } {
    return this.predictor_means !== undefined;
  }

  get_centered_data(data: Data<predictors>): Data<predictors> {
    if (!this.has_means()) {
      throw new Error(
        "You must provide predictor_means in the options to center data"
      );
    }
    return Object.fromEntries(
      this.predictors.map((key) => {
        const value = data[key] - this.predictor_means[key];
        return [key, value];
      })
    ) as Data<predictors>;
  }

  /**
   * Calculate coefficient * data_value for each predictor. This
   * gives values in the log-odds space, which can be used
   * as Shapley values for a logistic regression model
   */
  get_xb_values(data: Data<predictors>): Data<predictors> {
    const pred_data = this.center_predictors
      ? this.get_centered_data(data)
      : data;
    return Object.fromEntries(
      this.predictors.map((key) => {
        const value = this.coefs.coefs[key] * pred_data[key];
        return [key, value];
      })
    ) as Data<predictors>;
  }

  linear_prediction(data: Data<predictors>): number {
    const pred_data = this.center_predictors
      ? this.get_centered_data(data)
      : data;
    return (
      this.coefs.intercept +
      this.predictors.reduce(
        (sum: number, key) => sum + this.coefs.coefs[key] * pred_data[key],
        0
      )
    );
  }

  predict(data: Data<predictors>): number {
    const xb = this.linear_prediction(data);
    return inverse_logit(xb);
  }

  confidence_interval(
    data: Data<predictors>,
    ci: number = 0.95
  ): [number, number] {
    if (!this.has_vcov()) {
      throw new Error(
        "You must provide vcov (the variance-covariance matrix) to calculate confidence intervals"
      );
    }
    const pred_data = this.center_predictors
      ? this.get_centered_data(data)
      : data;
    const tail = 1 - ci;
    const z = qnorm(1 - tail / 2);
    const pred_matrix = new Matrix([[1, ...Object.values<number>(pred_data)]]);
    const variance: number = pred_matrix
      .mmul(this.vcov)
      .mmul(pred_matrix.transpose())
      .get(0, 0);
    const std_error: number = Math.sqrt(variance);
    const xb = this.linear_prediction(data);
    const xb_upper = xb + std_error * z;
    const xb_lower = xb - std_error * z;
    const p_lower = inverse_logit(xb_lower);
    const p_upper = inverse_logit(xb_upper);
    return [p_lower, p_upper];
  }

  get_equation(): string {
    const coef_strings = this.predictors.map((predictor) => {
      if (this.center_predictors) {
        return `(${predictor} - ${this.predictor_means![predictor].toFixed(
          2
        )}) * ${this.coefs.coefs[predictor].toFixed(2)}`;
      } else {
        return `${predictor} * ${this.coefs.coefs[predictor].toFixed(2)}`;
      }
    });
    const intercept = this.coefs.intercept.toFixed(2);
    return intercept + " + " + coef_strings.join(" + ");
  }
}

function inverse_logit(x: number): number {
  return 1 / (1 + Math.exp(-1 * x));
}

export function qnorm(x: number) {
  return Math.sqrt(2) * erfinv(2 * x - 1);
}
