import { create, matrix, Matrix, matrixDependencies } from "mathjs";
import erfinv from "@stdlib/math-base-special-erfinv";

const math = create(matrixDependencies);

export type ModelCoefs<predictors extends string = string> = {
  intercept: number;
  coefs: Record<predictors, number>;
};

export type Data<predictors extends string = string> = Readonly<
  Record<predictors, number>
>;

interface LogisticModelOptions {
  vcov?: number[][];
  scale_predictors?: boolean;
}

export class LogisticModel<predictors extends string> {
  readonly predictors: predictors[];
  readonly coefs: ModelCoefs<predictors>;
  readonly vcov: Matrix | undefined;
  readonly scale_predictors: boolean;

  constructor(coefs: ModelCoefs<predictors>, options?: LogisticModelOptions) {
    this.predictors = Object.keys(coefs.coefs) as predictors[];
    this.coefs = coefs;
    this.vcov = options?.vcov ? math.matrix(options.vcov) : undefined;
    this.scale_predictors = options?.scale_predictors || false;
  }

  private has_vcov(): this is this & { vcov: Matrix } {
    return this.vcov !== undefined;
  }

  linear_prediction(data: Data<predictors>): number {
    return (
      this.coefs.intercept +
      this.predictors.reduce(
        (sum: number, key) => sum + this.coefs.coefs[key] * data[key],
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
    const tail = 1 - ci;
    const z = qnorm(1 - tail / 2);
    const pred_matrix = matrix([1, ...Object.values<number>(data)]);
    // @ts-expect-error: math.js's types seem to be wrong here, if the result
    //   is scalar it will just be a number
    const variance: number = math.multiply(
      math.multiply(pred_matrix, this.vcov),
      math.transpose(pred_matrix)
    );
    const std_error: number = math.sqrt(variance) as number;
    const xb = this.linear_prediction(data);
    const xb_upper = xb + std_error * z;
    const xb_lower = xb - std_error * z;
    const p_lower = inverse_logit(xb_lower);
    const p_upper = inverse_logit(xb_upper);
    return [p_lower, p_upper];
  }
}

function inverse_logit(x: number): number {
  return 1 / (1 + Math.exp(-1 * x));
}

export function qnorm(x: number) {
  return Math.sqrt(2) * erfinv(2 * x - 1);
}
