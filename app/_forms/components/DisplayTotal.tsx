"use client";
import { AceScaleScores } from "@/app/_forms/schemas/ace";
import { Badge } from "flowbite-react";
import { useTotalScore } from "@/app/_hooks/useTotalScore";
import { LogisticModel } from "@/lib/logistic";
import { useValidatedScores } from "@/app/_hooks/useValidatedScores";

interface DisplayTotalProps {
  scores: Partial<AceScaleScores>;
  model: LogisticModel<keyof AceScaleScores>;
}

export function DisplayTotal(props: DisplayTotalProps) {
  const { scores, model } = props;
  const { valid, total } = useTotalScore(scores);
  const { scores: validated_scores } = useValidatedScores(scores);
  const risk = validated_scores
    ? 1 - model.predict(validated_scores)
    : undefined;
  if (risk) {
    console.log(model.get_centered_data(validated_scores!));
  }

  return (
    <>
      <Badge className="max-w-sm justify-center" size="lg">
        Total score: {valid ? total : "..."}
      </Badge>
      <Badge className="max-w-sm justify-center" size="lg">
        Predicted risk: {risk ? risk.toPrecision(3) : "..."}
      </Badge>
    </>
  );
}
