import { object, number, InferType, Message, string } from "yup";

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

/**
 * Schema for the form inputs of the ACE-III scales.
 * Note we need two schemas: one for the form inputs, which need to accept
 * null so they can be reset, and one for the final parsed values,
 * which should all be numbers, and require all numbers entered to be
 * considered valid
 */
export const AceScaleScoresInputSchema = object({
  attention: number()
    .label(AceScaleInfo.attention.label)
    .integer()
    .min(0)
    .max(AceScaleInfo.attention.max, max_score_message)
    .typeError("Please enter a number")
    .nullable(),
  memory: number()
    .label(AceScaleInfo.memory.label)
    .integer()
    .min(0)
    .max(AceScaleInfo.memory.max, max_score_message)
    .typeError("Please enter a number")
    .nullable(),
  fluency: number()
    .label(AceScaleInfo.fluency.label)
    .integer()
    .min(0)
    .max(AceScaleInfo.fluency.max, max_score_message)
    .typeError("Please enter a number")
    .nullable(),
  language: number()
    .label(AceScaleInfo.language.label)
    .integer()
    .min(0)
    .max(AceScaleInfo.language.max, max_score_message)
    .typeError("Please enter a number")
    .nullable(),
  visuospatial: number()
    .label(AceScaleInfo.visuospatial.label)
    .integer()
    .min(0)
    .max(AceScaleInfo.visuospatial.max, max_score_message)
    .typeError("Please enter a number")
    .nullable(),
});
/**
 * Schema for the final values of the ACE-III scale scores, with
 * all values defined
 */
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

export type AceScaleScoresInput = InferType<typeof AceScaleScoresInputSchema>;
export type AceScaleScores = InferType<typeof AceScaleScoresSchema>;

export const AceScales: (keyof AceScaleScores)[] = [
  "attention",
  "memory",
  "fluency",
  "language",
  "visuospatial",
];

export const AceScaleScoresDefaultInputs = {
  attention: null,
  memory: null,
  fluency: null,
  language: null,
  visuospatial: null,
};
