"use client";
import React, { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import { AceScaleScores, AceScaleScoresInput } from "@/app/_forms/schemas/ace";
import { LogisticModel } from "@/lib/logistic";
import { useValidatedScores } from "@/app/_hooks/useValidatedScores";
import PlotSkeleton from "@/app/_components/PlotSkeleton";
import { create_d3_gradient } from "@/app/_plots/plot_utils";
import { colours } from "@/app/_utils/colours";
import PlotTitleWithTooltip from "@/app/_components/PlotTitleWithTooltip";

interface RiskPlotProps {
  scores: Partial<AceScaleScoresInput>;
  model: LogisticModel<keyof AceScaleScores>;
}

const WIDTH = 500;
const HEIGHT = 200;

export default function RiskPlot(props: RiskPlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { model } = props;
  const { scores } = useValidatedScores(props.scores);
  // NOTE: the model is currently coded with "non-dementia" as the *positive*
  //   outcome, so we need 1 - risk for the risk of dementia
  const risk = scores ? (1 - model.predict(scores)) * 100 : undefined;

  useEffect(() => {
    const conf_int_reversed = scores
      ? model.confidence_interval(scores)
      : undefined;
    const conf_int =
      conf_int_reversed !== undefined
        ? {
            upper: (1 - conf_int_reversed[0]) * 100,
            lower: (1 - conf_int_reversed[1]) * 100,
          }
        : undefined;

    const plot = Plot.plot({
      width: WIDTH,
      height: HEIGHT,
      style: { fontSize: "10pt" },
      marginBottom: 50,
      x: {
        grid: true,
        label: "Risk (%)",
        domain: [0, 100],
        labelAnchor: "center",
      },
      y: { domain: [0, 10] },
      color: {
        type: "sequential",
        scheme: "magma",
        domain: [0, 100],
        reverse: true,
      },
      marks: [
        create_d3_gradient(10, "risk_gradient", undefined, true),
        Plot.axisY({ ticks: [] }),
        Plot.rect([{ min: 0, max: 100 }], {
          x1: "min",
          x2: "max",
          y1: 0,
          y2: 10,
          fill: "url(#risk_gradient)",
          fillOpacity: 0.7,
          stroke: "black",
          strokeWidth: 1,
        }),
        conf_int
          ? Plot.ruleY([conf_int], {
              x1: "lower",
              x2: "upper",
              y: 5,
              marker: "tick",
              stroke: colours.indigo800,
              strokeOpacity: 0.7,
              strokeWidth: 2,
            })
          : null,
        // Only show total marker once we have a valid total
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
  }, [risk, model, scores]);
  const Tooltip = () => (
    <>
      <p className="mb-2">
        The predicted risk of dementia value is obtained from a logistic
        regression model based on the ACE-III subdomain scores, fitted to our
        sample.
      </p>
      <p>
        The horizontal line represents the 95% prediction interval for risk.
      </p>
    </>
  );
  const Title = (props: { risk: number | undefined }) => {
    const risk = props.risk;
    if (risk !== undefined) {
      return (
        <>
          <span className="me-3">Dementia risk value: {Math.round(risk)}%</span>
          <span className="text-gray-500 font-light">
            (binomial logistic regression)
          </span>
        </>
      );
    } else {
      return (
        <>
          <span className="me-3">Dementia risk value</span>
          <span className="text-gray-500 font-light">
            (binomial logistic regression)
          </span>
        </>
      );
    }
  };
  return (
    <div>
      <PlotTitleWithTooltip
        title={<Title risk={risk} />}
        tooltip_content={<Tooltip />}
        popover_id="risk_plot_tooltip"
      />
      <div ref={containerRef}>
        <PlotSkeleton className="w-500px h-200px" />
      </div>
    </div>
  );
}
