import { object, number, InferType, Message } from "yup";

const max_score_message: Message = (data) => {
  return `The score for ${data.label} should be less than ${data.max}`;
};

// TODO: Should these all be required?
export const AceScaleScoresSchema = object({
  attention: number()
    .label("Attention")
    .integer()
    .min(0)
    .max(18, max_score_message),
  memory: number().label("Memory").integer().min(0).max(26, max_score_message),
  fluency: number()
    .label("Fluency")
    .integer()
    .min(0)
    .max(14, max_score_message),
  language: number()
    .label("Language")
    .integer()
    .min(0)
    .max(26, max_score_message),
  visual: number()
    .label("Visuospatial")
    .integer()
    .min(0)
    .max(16, max_score_message),
});

export type AceScaleScores = InferType<typeof AceScaleScoresSchema>;

export const AceScales: (keyof AceScaleScores)[] = [
  "attention",
  "memory",
  "fluency",
  "language",
  "visual",
];
