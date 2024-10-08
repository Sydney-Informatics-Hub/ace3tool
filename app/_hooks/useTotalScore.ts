import {
  AceScaleScoresInput,
  AceScaleScoresSchema,
} from "@/app/_forms/schemas/ace";
import { useEffect, useState } from "react";

export function useTotalScore(scores: Partial<AceScaleScoresInput>) {
  const [valid, setValid] = useState(false);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    AceScaleScoresSchema.validate(scores)
      .then((parsed) => {
        const sum = Object.values(parsed).reduce(
          (sum, score) => sum + score,
          0
        );
        setValid(true);
        setTotal(sum);
      })
      .catch((err) => {
        setValid(false);
        setTotal(0);
        return;
      });
  }, [scores]);

  return { valid, total };
}
