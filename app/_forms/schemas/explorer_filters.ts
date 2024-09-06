import * as yup from "yup";
import { object, string } from "yup";

export const FilterOptions = {
  sex: ["All", "Male", "Female"],
  learning_difficulties: ["All", "Yes", "No"],
  age_group: ["All", "<55", "55-74", "75+"],
};

export const FilterLabels = {
  sex: "Sex",
  learning_difficulties: "Learning difficulties",
  age_group: "Age group",
};

export const ExplorerFilterSchema = object({
  sex: string().oneOf(FilterOptions.sex).default("All"),
  learning_difficulties: string()
    .oneOf(FilterOptions.learning_difficulties)
    .default("All"),
  age_group: string().oneOf(FilterOptions.age_group).default("All"),
});

export interface ExplorerFilters
  extends yup.InferType<typeof ExplorerFilterSchema> {}

export const ExplorerFilterNames: (keyof ExplorerFilters)[] = [
  "sex",
  "learning_difficulties",
  "age_group",
];
