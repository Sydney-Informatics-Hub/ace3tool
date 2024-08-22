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
import distribution_data from "@/app/_model/dist_summary_v1.json";
import PlotSkeleton from "@/app/_components/PlotSkeleton";
import { useTotalScore } from "@/app/_hooks/useTotalScore";
import { colours } from "@/app/_utils/colours";

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
      value: rescale_score(Math.floor(sd_threshold), key),
    };
  });
  const spec_threshold_data = AceScalesWithTotal.map((key) => {
    const threshold = data_summary.specificity_100[key];
    return {
      scale: InfoWithTotal[key].label,
      value: rescale_score(Math.floor(threshold), key),
    };
  });
  const score_data = AceScalesWithTotal.map((key) => {
    const score = scores_with_total ? scores_with_total[key] : undefined;
    const scaled_score = score ? rescale_score(score, key) : undefined;
    return { scale: InfoWithTotal[key].label, value: scaled_score };
  });

  useEffect(() => {
    const plot = Plot.plot({
      style: { fontSize: "10pt" },
      width: 800,
      height: 600,
      x: {
        label: "Score (% of maximum)",
        domain: [0, 100],
      },
      y: { domain: [-1, 1] },
      facet: {
        data: bar_data,
        y: "scale",
        label: null,
        marginBottom: 10,
      },
      fy: {
        domain: [...AceScales.map((key) => AceScaleInfo[key].label), "Total"],
        label: null,
        ticks: [],
      },
      color: {
        type: "categorical",
        scheme: "Tableau10",
        domain: [...AceScales.map((key) => AceScaleInfo[key].label), "Total"],
      },
      marks: [
        Plot.axisX({
          ticks: [],
          labelAnchor: "center",
          labelArrow: "none",
          fontSize: "12pt",
        }),
        Plot.axisY({ ticks: [], label: null }),
        // Plot.barY(bar_data, {
        //   y: "height",
        //   fill: "scale",
        //   fx: "scale",
        //   fillOpacity: 0.2,
        //   stroke: "black",
        //   strokeWidth: 2,
        //   strokeOpacity: 1,
        // }),
        Plot.areaY(distribution_data.dementia, {
          y: (d) => -1 * d.prop_scaled,
          fy: "scale",
          fill: "scale",
          fillOpacity: 1,
          sort: "score",
          stroke: "black",
          x: (d) => rescale_score(d.score, d.scale.toLowerCase()),
        }),
        Plot.areaY(distribution_data.control, {
          y: "prop_scaled",
          fy: "scale",
          fill: "scale",
          fillOpacity: 0.5,
          sort: "score",
          stroke: "black",
          x: (d) => rescale_score(d.score, d.scale.toLowerCase()),
        }),
        Plot.text(
          distribution_data.control,
          Plot.selectFirst({
            text: "scale",
            fy: "scale",
            frameAnchor: "top-left",
            dx: 6,
            dy: 6,
            fontSize: "12pt",
          })
        ),
        Plot.ruleY([0], { stroke: "black", strokeWidth: 2 }),
        Plot.tickX(sd_threshold_data, {
          fy: "scale",
          x: "value",
          stroke: colours.orange500,
          strokeDasharray: "1,4",
          strokeLinecap: "round",
          strokeWidth: 3,
        }),
        Plot.tickX(spec_threshold_data, {
          fy: "scale",
          x: "value",
          stroke: colours.red600,
          strokeDasharray: "4,4",
          strokeWidth: 3,
        }),
        scores
          ? Plot.tickX(score_data, {
              fy: "scale",
              x: "value",
              strokeWidth: 3,
              marker: "circle-stroke",
              stroke: colours.indigo600,
            })
          : null,
      ],
    });
    containerRef?.current?.replaceChildren(plot);
    return () => plot.remove();
  }, [
    risk,
    bar_data,
    score_data,
    sd_threshold_data,
    spec_threshold_data,
    scores,
  ]);
  return (
    <div ref={containerRef}>
      <PlotSkeleton width={500} height={500} />
    </div>
  );
}
