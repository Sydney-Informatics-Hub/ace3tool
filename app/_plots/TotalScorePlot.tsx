"use client";
import React, { useEffect, useRef, useState } from "react";
import * as Plot from "@observablehq/plot";
import {
  AceScaleScores,
  AceScales,
  AceScaleScoresSchema,
} from "@/app/_forms/schemas/ace";
import { schemeTableau10 } from "d3-scale-chromatic";
import { useTotalScore } from "@/app/_hooks/useTotalScore";

type ScoreRange = {
  label: string;
  min: number;
  max: number;
  width: number;
};

const Ranges: ScoreRange[] = [
  { label: "Low risk", min: 0, max: 60, width: 60 },
  { label: "Moderate risk", min: 60, max: 80, width: 20 },
  { label: "High risk", min: 80, max: 100, width: 20 },
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
      width: 500,
      height: 150,
      x: { grid: true, label: "ACE-III total score" },
      color: {
        type: "ordinal",
        scheme: "YlOrRd",
        domain: ["Low risk", "Moderate risk", "High risk"],
      },
      marks: [
        Plot.axisY({ ticks: [] }),
        Plot.rect(Ranges, {
          x1: "min",
          x2: "max",
          y1: 0,
          y2: 10,
          fill: "label",
          opacity: 0.7,
        }),
        // Only show total marker once we have a valid total
        valid
          ? Plot.tickX([{ score: total }], {
              x: "score",
              stroke: "black",
              marker: "circle",
              strokeWidth: 2,
            })
          : null,
      ],
    });
    containerRef?.current?.append(plot);
    return () => plot.remove();
  });
  return <div ref={containerRef} />;
}
