"use client";
import React, { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import {
  AceScaleInfo,
  AceScales,
  AceScaleScoresInput,
} from "@/app/_forms/schemas/ace";
import PlotSkeleton from "@/app/_components/PlotSkeleton";
import { ace_colour_scale } from "@/app/_utils/colours";
import PlotTitle from "@/app/_components/PlotTitle";

const WIDTH = 500;
const HEIGHT = 400;

interface ScoreBarPlotProps {
  scores: Partial<AceScaleScoresInput>;
}

export default function ScoreBarPlot(props: ScoreBarPlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scores = props.scores;
  const score_data = AceScales.map((key) => {
    return {
      scale: AceScaleInfo[key].label,
      score: scores[key] ? scores[key] : 0,
      max: AceScaleInfo[key].max,
    };
  });

  useEffect(() => {
    const plot = Plot.plot({
      width: WIDTH,
      height: HEIGHT,
      style: { fontSize: "10pt" },
      y: {
        label: "Score",
        domain: [0, 27],
      },
      x: {
        domain: AceScales.map((key) => AceScaleInfo[key].label),
        padding: 0.2,
      },
      color: {
        type: "categorical",
        ...ace_colour_scale,
      },
      marks: [
        Plot.axisX({ label: null, tickSize: 0 }),
        Plot.barY(score_data, {
          y: "max",
          x: "scale",
          fill: "scale",
          opacity: 0.3,
          inset: -5,
          insetBottom: 0,
        }),
        // Plot.text(score_data, {
        //   x: "scale",
        //   y: "max",
        //   dy: -6,
        //   text: (d) => `Max: ${d.max}`,
        // }),
        Plot.barY(score_data, {
          y: "score",
          fill: "scale",
          x: "scale",
          opacity: 0.8,
          stroke: "black",
        }),
      ],
    });
    containerRef?.current?.replaceChildren(plot);
    return () => plot.remove();
  }, [score_data]);
  return (
    <>
      <PlotTitle>Subdomain raw scores</PlotTitle>
      <div ref={containerRef}>
        <PlotSkeleton className="w-500px h-400px" />
      </div>
    </>
  );
}
