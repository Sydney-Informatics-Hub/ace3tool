"use client";
import React, { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import {
  AceScaleInfo,
  AceScales,
  AceScaleScores,
} from "@/app/_forms/schemas/ace";
import PlotSkeleton from "@/app/_components/PlotSkeleton";

interface ScoreBarPlotProps {
  scores: Partial<AceScaleScores>;
}

export default function ScoreBarPlot(props: ScoreBarPlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scores = props.scores;
  const score_data = AceScales.map((key) => {
    return {
      scale: AceScaleInfo[key].label,
      score: scores[key] ? scores[key] : 0,
    };
  });

  useEffect(() => {
    const plot = Plot.plot({
      width: 500,
      height: 500,
      y: {
        label: "Score",
        domain: [0, 30],
      },
      x: { domain: AceScales.map((key) => AceScaleInfo[key].label) },
      color: {
        type: "categorical",
        scheme: "Tableau10",
      },
      marks: [
        Plot.axisX({ label: null }),
        Plot.barY(score_data, {
          y: "score",
          fill: "scale",
          x: "scale",
          stroke: "black",
          opacity: 0.8,
        }),
      ],
    });
    containerRef?.current?.replaceChildren(plot);
    return () => plot.remove();
  }, [score_data]);
  return (
    <div ref={containerRef}>
      <PlotSkeleton width={500} height={500} />
    </div>
  );
}
