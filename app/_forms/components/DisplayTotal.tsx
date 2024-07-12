"use client";
import { AceScaleScores, AceScaleScoresSchema } from "@/app/_forms/schemas/ace";
import { Badge } from "flowbite-react";
import { useEffect, useState } from "react";

interface DisplayTotalProps {
  scores: {
    attention?: number | undefined;
    memory?: number | undefined;
    visual?: number | undefined;
    fluency?: number | undefined;
    language?: number | undefined;
  };
}
export function DisplayTotal(props: DisplayTotalProps) {
  const [total, setTotal] = useState<number>(0);
  const { scores } = props;

  useEffect(() => {
    AceScaleScoresSchema.validate(scores)
      .then((parsed) => {
        const sum = Object.values(parsed).reduce(
          (sum, score) => sum + score,
          0
        );
        setTotal(sum);
      })
      .catch((err) => {
        return;
      });
  });
  return <Badge>{total}</Badge>;
}
