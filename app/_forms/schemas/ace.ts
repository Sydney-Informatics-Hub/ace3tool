import { object, number, InferType, Message } from "yup";

export const AceScaleInfo: Record<
  "attention" | "memory" | "fluency" | "language" | "visuospatial",
  { max: number; label: string }
> = {
  attention: {
    max: 18,
    label: "Attention",
  },
  memory: {
    max: 26,
    label: "Memory",
  },
  fluency: {
    max: 14,
    label: "Fluency",
  },
  language: {
    max: 26,
    label: "Language",
  },
  visuospatial: {
    max: 16,
    label: "Visuospatial",
  },
} as const;

const max_score_message: Message = (data) => {
  return `The score for ${data.label} should be between 0 and ${data.max}`;
};

export const AceScaleScoresSchema = object({
  attention: number()
    .label(AceScaleInfo.attention.label)
    .integer()
    .min(0)
    .max(AceScaleInfo.attention.max, max_score_message)
    .typeError("Please enter a number")
    .required(),
  memory: number()
    .label(AceScaleInfo.memory.label)
    .integer()
    .min(0)
    .max(AceScaleInfo.memory.max, max_score_message)
    .typeError("Please enter a number")
    .required(),
  fluency: number()
    .label(AceScaleInfo.fluency.label)
    .integer()
    .min(0)
    .max(AceScaleInfo.fluency.max, max_score_message)
    .typeError("Please enter a number")
    .required(),
  language: number()
    .label(AceScaleInfo.language.label)
    .integer()
    .min(0)
    .max(AceScaleInfo.language.max, max_score_message)
    .typeError("Please enter a number")
    .required(),
  visuospatial: number()
    .label(AceScaleInfo.visuospatial.label)
    .integer()
    .min(0)
    .max(AceScaleInfo.visuospatial.max, max_score_message)
    .typeError("Please enter a number")
    .required(),
});

export type AceScaleScores = InferType<typeof AceScaleScoresSchema>;

export const AceScales: (keyof AceScaleScores)[] = [
  "attention",
  "memory",
  "fluency",
  "language",
  "visuospatial",
];
