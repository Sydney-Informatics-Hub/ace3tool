import model_data from "@/app/_model/logistic_model_v1.json";
import { Data, get_predictors, LogisticModel } from "@/lib/logistic";

const logistic_model = new LogisticModel(model_data.coefs, {
  vcov: model_data.vcov,
  predictor_means: model_data.means,
  center_predictors: true,
});
export default logistic_model;

// TODO: should this be based on the dementia means instead?
export interface DataSummary<predictors extends string> {
  control_means: Data<predictors>;
  control_sds: Data<predictors>;
}

export function get_z_scores<predictors extends string>(
  scores: Data<predictors>,
  summary: DataSummary<predictors>
): Data<predictors> {
  const predictor_names = get_predictors(scores);
  const z_scores: [predictors, number][] = predictor_names.map((predictor) => {
    const diff = scores[predictor] - summary.control_means[predictor];
    return [predictor, diff / summary.control_sds[predictor]];
  });
  return Object.fromEntries(z_scores) as Data<predictors>;
}

type Difference<predictors extends string> = {
  predictor: predictors;
  diff: number;
};

function get_largest_differences<predictors extends string>(
  z_scores: Data<predictors>
): Record<predictors, Difference<predictors>> {
  const predictor_names = get_predictors(z_scores);
  const largest_diffs = predictor_names.map(
    (predictor): [predictors, Difference<predictors>] => {
      const largest_diff = predictor_names
        .filter((other) => other !== predictor)
        .map((other): Difference<predictors> => {
          const diff = z_scores[predictor] - z_scores[other];
          return { predictor: other, diff };
        })
        .reduce((prev, current) => {
          if (current.diff < prev.diff) {
            return current;
          }
          return prev;
        });
      return [predictor, largest_diff];
    }
  );
  return Object.fromEntries(largest_diffs) as Record<
    predictors,
    Difference<predictors>
  >;
}

// Find any scores where the predictor/column's z-score differs from
// other scores by 2 SDs
// TODO: should this be scores that differ from *all* other scores by
//   at least 2 SDs, i.e. find the smallest difference rather than largest?
export function get_extreme_scores<predictors extends string>(
  scores: Data<predictors>,
  summary: DataSummary<predictors>,
  threshold: number = -2
): Record<predictors, Difference<predictors>> {
  const z_scores = get_z_scores(scores, summary);
  const largest_diffs = get_largest_differences(z_scores);
  const extreme_diffs = Object.entries<Difference<predictors>>(
    largest_diffs
  ).filter(([_, difference]) => {
    return difference.diff < threshold;
  });
  return Object.fromEntries(extreme_diffs) as Record<
    predictors,
    Difference<predictors>
  >;
}
