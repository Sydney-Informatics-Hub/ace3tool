"use client";
import React, { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import { AceScaleScores } from "@/app/_forms/schemas/ace";
import { LogisticModel } from "@/lib/logistic";
import { useValidatedScores } from "@/app/_hooks/useValidatedScores";
import PlotSkeleton from "@/app/_components/PlotSkeleton";

function create_risk_ranges(n: number) {
  let start = 0;
  const width = 100 / n;
  const ranges: { start: number; end: number }[] = [];
  [...Array(n).keys()].map(() => {
    ranges.push({ start, end: start + width });
    start += width;
  });
  return ranges;
}

const ranges = create_risk_ranges(100);

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
  const risk = scores ? (1 - model.predict(scores)) * 100 : undefined;
  const conf_int_reversed = scores
    ? model.confidence_interval(scores)
    : undefined;
  const conf_int =
    conf_int_reversed !== undefined
      ? { upper: 1 - conf_int_reversed[0], lower: 1 - conf_int_reversed[1] }
      : undefined;

  useEffect(() => {
    const plot = Plot.plot({
      title: risk
        ? `Predicted risk of dementia: ${Math.round(risk)}%`
        : "Predicted risk of dementia",
      width: 500,
      height: 150,
      x: { grid: true, label: "Risk (%)", reverse: true },
      color: {
        type: "sequential",
        scheme: "magma",
        domain: [0, 100],
        reverse: true,
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
        conf_int
          ? Plot.ruleY([conf_int], {
              x1: "lower",
              x2: "upper",
              y: 5,
              stroke: "#404040",
              strokeWidth: 1,
            })
          : null,
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
  }, [risk, conf_int]);
  return (
    <div ref={containerRef}>
      <PlotSkeleton width={500} height={150} />
    </div>
  );
}
