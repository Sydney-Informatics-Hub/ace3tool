"use client";
import React, { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import { AceScaleScores } from "@/app/_forms/schemas/ace";
import { LogisticModel } from "@/lib/logistic";
import { useValidatedScores } from "@/app/_hooks/useValidatedScores";
import { PlotPlaceholder } from "@/app/_components/PlotPlaceholder";

function create_risk_ranges(n: number) {
  let start = 0;
  const width = 1 / n;
  const ranges: { start: number; end: number }[] = [];
  [...Array(n).keys()].map(() => {
    ranges.push({ start, end: start + width });
    start += width;
  });
  return ranges;
}

const ranges = create_risk_ranges(50);

interface RiskPlotProps {
  scores: Partial<AceScaleScores>;
  model: LogisticModel<keyof AceScaleScores>;
}

export default function RiskPlot(props: RiskPlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { model } = props;
  const { scores } = useValidatedScores(props.scores);
  // NOTE: the model is currently coded with "non-dementia" as the *positive*
  //   outcome, so we need 1 - risk for the risk of dementia
  const risk = scores ? 1 - model.predict(scores) : undefined;

  useEffect(() => {
    const plot = Plot.plot({
      title: "Predicted risk",
      width: 500,
      height: 150,
      x: { grid: true, label: "Risk" },
      color: {
        type: "sequential",
        scheme: "magma",
        domain: [0.0, 1.0],
      },
      marks: [
        Plot.axisY({ ticks: [] }),
        // TODO: Might be better to use an SVG gradient for this?
        //   https://observablehq.com/@observablehq/plot-gradient-bars
        Plot.rect(ranges, {
          x1: "start",
          x2: "end",
          y1: 0,
          y2: 10,
          fill: "start",
          opacity: 0.7,
        }),
        // Only show total marker once we have a valid total
        risk
          ? Plot.tickX([{ score: risk }], {
              x: "score",
              stroke: "black",
              marker: "circle",
              strokeWidth: 2,
            })
          : null,
      ],
    });
    containerRef?.current?.replaceChildren(plot);
    return () => plot.remove();
  }, [risk]);
  return (
    <div ref={containerRef}>
      <PlotPlaceholder />
    </div>
  );
}
