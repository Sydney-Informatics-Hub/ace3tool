"use client";
import React, { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import { AceScaleScores } from "@/app/_forms/schemas/ace";
import { LogisticModel } from "@/lib/logistic";
import PlotSkeleton from "@/app/_components/PlotSkeleton";
import { useTotalScore } from "@/app/_hooks/useTotalScore";
import { bold_title, create_d3_gradient } from "@/app/_plots/plot_utils";
import { colours } from "@/app/_utils/colours";

interface RiskPlotTotalProps {
  scores: Partial<AceScaleScores>;
  model: LogisticModel<"total">;
}

export default function RiskPlotTotal(props: RiskPlotTotalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { model } = props;
  const { valid, total } = useTotalScore(props.scores);
  // NOTE: the model is currently coded with "non-dementia" as the *positive*
  //   outcome, so we need 1 - risk for the risk of dementia
  const risk = valid ? (1 - model.predict({ total: total })) * 100 : undefined;

  useEffect(() => {
    // TODO: don't have vcov for total model yet
    // const conf_int_reversed = scores
    //   ? model.confidence_interval(scores)
    //   : undefined;
    // const conf_int =
    //   conf_int_reversed !== undefined
    //     ? { upper: 1 - conf_int_reversed[0], lower: 1 - conf_int_reversed[1] }
    //     : undefined;
    const title = bold_title(
      risk
        ? `Predicted risk of dementia (total score model): ${Math.round(risk)}%`
        : "Predicted risk of dementia (total score model)"
    );

    const plot = Plot.plot({
      title: title,
      width: 500,
      height: 150,
      x: { grid: true, label: "Risk (%)" },
      color: {
        type: "sequential",
        scheme: "magma",
        domain: [0, 100],
        reverse: true,
      },
      marks: [
        create_d3_gradient(10, "total_risk_gradient", undefined, true),
        Plot.axisY({ ticks: [] }),
        // TODO: Might be better to use an SVG gradient for this?
        //   https://observablehq.com/@observablehq/plot-gradient-bars
        Plot.rect([{ min: 0, max: 100 }], {
          x1: "min",
          x2: "max",
          y1: 0,
          y2: 10,
          fill: "url(#total_risk_gradient)",
          fillOpacity: 0.7,
          stroke: "black",
          strokeWidth: 1,
        }),
        // conf_int
        //   ? Plot.ruleY([conf_int], {
        //       x1: "lower",
        //       x2: "upper",
        //       y: 5,
        //       stroke: "#404040",
        //       strokeWidth: 1,
        //     })
        //   : null,
        // Only show marker once we have a valid risk
        risk
          ? Plot.tickX([{ score: risk }], {
              x: "score",
              stroke: colours.indigo600,
              marker: "circle-stroke",
              strokeWidth: 3,
              fill: colours.indigo600,
            })
          : null,
      ],
    });
    containerRef?.current?.replaceChildren(plot);
    return () => plot.remove();
  }, [risk, model, valid, total]);
  return (
    <div ref={containerRef}>
      <PlotSkeleton width={500} height={150} />
    </div>
  );
}
