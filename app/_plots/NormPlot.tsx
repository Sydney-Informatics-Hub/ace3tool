"use client";
import React, { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import {
  AceScaleInfo,
  AceScales,
  AceScaleScores,
} from "@/app/_forms/schemas/ace";
import { LogisticModel } from "@/lib/logistic";
import { useValidatedScores } from "@/app/_hooks/useValidatedScores";
import data_summary from "@/app/_model/data_summary_v1.json";
import PlotSkeleton from "@/app/_components/PlotSkeleton";
import { useTotalScore } from "@/app/_hooks/useTotalScore";

const AceScalesWithTotal = [...AceScales, "total"] as const;
const InfoWithTotal = { ...AceScaleInfo, total: { max: 100, label: "Total" } };

const rescale_score = (
  score: number,
  scale: keyof AceScaleScores | "total"
) => {
  return (score / InfoWithTotal[scale].max) * 100;
};

interface NormPlotProps {
  scores: Partial<AceScaleScores>;
  model: LogisticModel<keyof AceScaleScores>;
}

export default function NormPlot(props: NormPlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { model } = props;
  const { scores } = useValidatedScores(props.scores);
  const { total } = useTotalScore(props.scores);
  const scores_with_total = scores ? { ...scores, total } : undefined;
  // NOTE: the model is currently coded with "non-dementia" as the *positive*
  //   outcome, so we need 1 - risk for the risk of dementia
  const risk = scores ? 1 - model.predict(scores) : undefined;
  const bar_data = AceScalesWithTotal.map((key) => {
    return { scale: InfoWithTotal[key].label, height: 100 };
  });
  const sd_threshold_data = AceScalesWithTotal.map((key) => {
    const mean = data_summary.control_means[key];
    const sd = data_summary.control_sds[key];
    const sd_threshold = mean - 2 * sd;
    return {
      scale: InfoWithTotal[key].label,
      value: rescale_score(sd_threshold, key),
    };
  });
  const score_data = AceScalesWithTotal.map((key) => {
    const scaled_score = scores_with_total
      ? (scores_with_total[key] / InfoWithTotal[key].max) * 100
      : undefined;
    return { scale: InfoWithTotal[key].label, value: scaled_score };
  });

  useEffect(() => {
    const plot = Plot.plot({
      width: 500,
      height: 500,
      y: {
        label: "Score (% of maximum)",
        domain: [0, 100],
      },
      facet: {
        data: bar_data,
        x: "scale",
        label: null,
      },
      fx: {
        domain: [...AceScales.map((key) => AceScaleInfo[key].label), "Total"],
      },
      color: {
        type: "categorical",
        scheme: "Tableau10",
        domain: [...AceScales.map((key) => AceScaleInfo[key].label), "Total"],
      },
      marks: [
        Plot.axisY({ ticks: [], labelAnchor: "center", labelArrow: "none" }),
        Plot.barY(bar_data, {
          y: "height",
          fill: "scale",
          fx: "scale",
          fillOpacity: 0.5,
          stroke: "black",
          strokeWidth: 2,
          strokeOpacity: 1,
        }),
        Plot.tickY(sd_threshold_data, {
          fx: "scale",
          y: "value",
          stroke: "#f97316",
          strokeDasharray: "1,1",
          strokeWidth: 2,
        }),
        scores
          ? Plot.tickY(score_data, {
              fx: "scale",
              y: "value",
              strokeWidth: 2,
              marker: "circle",
              stroke: "#5850ec",
            })
          : null,
      ],
    });
    containerRef?.current?.replaceChildren(plot);
    return () => plot.remove();
  }, [risk, bar_data, score_data, sd_threshold_data, scores]);
  return (
    <div ref={containerRef}>
      <PlotSkeleton width={500} height={500} />
    </div>
  );
}
