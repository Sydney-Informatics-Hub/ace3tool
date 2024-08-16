import model_data from "@/app/_model/logistic_model_v1.json";
import total_model_data from "@/app/_model/total_model_v1.json";
import { LogisticModel } from "@/lib/logistic";

const logistic_model = new LogisticModel(model_data.coefs, {
  vcov: model_data.vcov,
  predictor_means: model_data.means,
  center_predictors: true,
});
export default logistic_model;

export const total_model = new LogisticModel(total_model_data.coefs, {
  predictor_means: total_model_data.means,
  center_predictors: true,
});
