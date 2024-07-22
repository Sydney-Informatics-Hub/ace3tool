import { AceScaleScores, AceScaleScoresSchema } from "@/app/_forms/schemas/ace";
import { useEffect, useState } from "react";

export function useValidatedScores(score_input: Partial<AceScaleScores>) {
  const [valid, setValid] = useState(false);
  const [scores, setScores] = useState<AceScaleScores | undefined>(undefined);

  useEffect(() => {
    AceScaleScoresSchema.validate(score_input)
      .then((parsed) => {
        setValid(true);
        setScores(parsed);
      })
      .catch((err) => {
        setValid(false);
        return;
      });
  }, [score_input]);

  return { valid, scores };
}
