import * as yup from "yup";
import { object, string } from "yup";

export const FilterOptions = {
  visit_number: ["All", "1", "2-3", "4+"],
  sex: ["All", "Male", "Female"],
  learning_difficulties: ["All", "Yes", "No"],
  age_group: ["All", "<55", "55-74", "75+"],
  education: ["All", "9 or less", "10-12", "13+"],
  goldman_score: ["All", "1-2", "3+", "Unknown"],
};

export const FilterLabels = {
  visit_number: "Visit number",
  sex: "Sex",
  learning_difficulties: "Learning difficulties",
  age_group: "Age group",
  education: "Years of education",
  goldman_score: "Goldman score",
};

export const ExplorerFilterSchema = object({
  visit_number: string().oneOf(FilterOptions.visit_number).default("All"),
  sex: string().oneOf(FilterOptions.sex).default("All"),
  learning_difficulties: string()
    .oneOf(FilterOptions.learning_difficulties)
    .default("All"),
  age_group: string().oneOf(FilterOptions.age_group).default("All"),
  education: string().oneOf(FilterOptions.education).default("All"),
  goldman_score: string().oneOf(FilterOptions.goldman_score).default("All"),
});

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ExplorerFilters
  extends yup.InferType<typeof ExplorerFilterSchema> {}

export const ExplorerFilterNames: (keyof ExplorerFilters)[] = [
  "visit_number",
  "sex",
  "learning_difficulties",
  "age_group",
  "education",
  "goldman_score",
];
