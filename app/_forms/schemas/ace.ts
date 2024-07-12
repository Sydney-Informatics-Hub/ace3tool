import { object, number, InferType } from "yup";

// TODO: Should these all be required?
export const AceScaleScoresSchema = object({
  attention: number().integer().min(0).max(18),
  memory: number().integer().min(0).max(26),
  fluency: number().integer().min(0).max(14),
  language: number().integer().min(0).max(26),
  visual: number().integer().min(0).max(16),
});

export type AceScaleScores = InferType<typeof AceScaleScoresSchema>;

export const AceScales: (keyof AceScaleScores)[] = [
  "attention",
  "memory",
  "fluency",
  "language",
  "visual",
];
