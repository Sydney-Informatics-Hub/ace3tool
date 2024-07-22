"use client";
import { AceScaleScores } from "@/app/_forms/schemas/ace";
import { Badge } from "flowbite-react";
import { useTotalScore } from "@/app/_hooks/useTotalScore";

interface DisplayTotalProps {
  scores: AceScaleScores;
}
export function DisplayTotal(props: DisplayTotalProps) {
  const { scores } = props;
  const { valid, total } = useTotalScore(scores);

  return (
    <Badge className="max-w-sm justify-center" size="lg">
      {valid ? total : "..."}
    </Badge>
  );
}
