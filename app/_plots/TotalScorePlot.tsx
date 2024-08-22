"use client";
import React, { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import { AceScaleScores } from "@/app/_forms/schemas/ace";
import { useTotalScore } from "@/app/_hooks/useTotalScore";
import PlotSkeleton from "@/app/_components/PlotSkeleton";
import { colours } from "@/app/_utils/colours";

type RiskLabels = "Moderate risk" | "Mild risk" | "Within normal limits";

type ScoreRange = {
  label: RiskLabels;
  min: number;
  max: number;
};

const Ranges: ScoreRange[] = [
  { label: "Moderate risk", min: 0, max: 82 },
  { label: "Mild risk", min: 82, max: 88 },
  { label: "Within normal limits", min: 88, max: 100 },
];

interface TotalScorePlotProps {
  scores: Partial<AceScaleScores>;
}

export default function TotalScorePlot(props: TotalScorePlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scores } = props;
  const { valid, total } = useTotalScore(scores);

  useEffect(() => {
    const plot = Plot.plot({
      title: valid ? `Total score: ${total}` : "Total score",
      width: 500,
      height: 150,
      x: { grid: true, label: "ACE-III total score" },
      color: {
        type: "categorical",
        scheme: "RdYlGn",
        range: [0, 1, 2],
        domain: ["Moderate risk", "Mild risk", "Within normal limits"],
        legend: true,
      },
      marks: [
        Plot.axisY({ ticks: [] }),
        Plot.rect(Ranges, {
          x1: "min",
          x2: "max",
          y1: 0,
          y2: 10,
          fillOpacity: 0.7,
          fill: "label",
        }),
        // Only show total marker once we have a valid total
        valid
          ? Plot.tickX([{ score: total }], {
              x: "score",
              stroke: colours.indigo600,
              marker: "circle-stroke",
              strokeWidth: 3,
            })
          : null,
      ],
    });
    containerRef?.current?.replaceChildren(plot);
    return () => plot.remove();
  }, [valid, total]);
  return (
    <div ref={containerRef}>
      <PlotSkeleton width={500} height={150} />
    </div>
  );
}
