import { all, create, matrix, Matrix } from "mathjs";
import erfinv from "@stdlib/math-base-special-erfinv";

const math = create(all);

export type Model<predictors extends string = string> = {
  coefs: ModelCoefs<predictors>;
};

export type ModelCoefs<predictors extends string = string> = {
  intercept: number;
  coefs: Record<predictors, number>;
};

export type Data<predictors extends string = string> = Readonly<
  Record<predictors, number>
>;

function linear_prediction<p extends string>(model: Model<p>, data: Data<p>) {
  const data_keys = Object.keys(data) as Array<p>;
  return (
    model.coefs.intercept +
    data_keys.reduce(
      (sum: number, key) => sum + model.coefs.coefs[key] * data[key],
      0
    )
  );
}

export function predict<p extends string>(model: Model<p>, data: Data<p>): number {
  const xb = linear_prediction(model, data);
  return inverse_logit(xb);
}

export function confidence_interval<p extends string>(
  model: Model<p>,
  vcov: Matrix,
  data: Data<p>,
  ci: number = 0.95
) {
  const tail = 1 - ci;
  const z = qnorm(1 - tail / 2);
  const pred_matrix = matrix([1, ...Object.values<number>(data)]);
  // math.js's types seem to be wrong here, not sure how to override apart from ts-ignore
  // @ts-ignore
  const variance: number = math.multiply(
    math.multiply(pred_matrix, vcov),
    math.transpose(pred_matrix)
  );
  // @ts-ignore
  const std_error: number = math.sqrt(variance);
  const xb = linear_prediction(model, data);
  const xb_upper = xb + std_error * z;
  const xb_lower = xb - std_error * z;
  const p_lower = inverse_logit(xb_lower);
  const p_upper = inverse_logit(xb_upper);
  return [p_lower, p_upper];
}

function inverse_logit(x: number): number {
  return 1 / (1 + Math.exp(-1 * x));
}

export function qnorm(x: number) {
  return Math.sqrt(2) * erfinv(2 * x - 1);
}
