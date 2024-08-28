"use client";
import React, { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import {
  AceScaleInfo,
  AceScales,
  AceScaleScores,
} from "@/app/_forms/schemas/ace";
import { useValidatedScores } from "@/app/_hooks/useValidatedScores";
import data_summary from "@/app/_model/data_summary_v1.json";
import distribution_data from "@/app/_model/dist_summary_v1.json";
import PlotSkeleton from "@/app/_components/PlotSkeleton";
import { ace_colour_scale, colours } from "@/app/_utils/colours";

const rescale_score = (score: number, scale: keyof AceScaleScores) => {
  return (score / AceScaleInfo[scale].max) * 100;
};

interface NormPlotProps {
  scores: Partial<AceScaleScores>;
}

export default function NormPlot(props: NormPlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scores } = useValidatedScores(props.scores);
  const bar_data = AceScales.map((key) => {
    return { scale: AceScaleInfo[key].label, height: 100 };
  });
  const sd_threshold_data = AceScales.map((key) => {
    const mean = data_summary.control_means[key];
    const sd = data_summary.control_sds[key];
    const sd_threshold = mean - 2 * sd;
    return {
      scale: AceScaleInfo[key].label,
      value: rescale_score(Math.floor(sd_threshold), key),
    };
  });
  const spec_threshold_data = AceScales.map((key) => {
    const threshold = data_summary.specificity_100[key];
    return {
      scale: AceScaleInfo[key].label,
      value: rescale_score(Math.floor(threshold), key),
    };
  });
  const score_data = AceScales.map((key) => {
    const score = scores ? scores[key] : undefined;
    const scaled_score = score ? rescale_score(score, key) : undefined;
    return { scale: AceScaleInfo[key].label, value: scaled_score };
  });

  useEffect(() => {
    const plot = Plot.plot({
      style: { fontSize: "10pt" },
      width: 800,
      height: 600,
      marginBottom: 50,
      x: {
        label: "Score (% of maximum)",
        domain: [0, 100],
        reverse: true,
        grid: true,
        ticks: 10,
      },
      y: { domain: [-1, 1] },
      facet: {
        data: bar_data,
        y: "scale",
        label: null,
        marginBottom: 10,
      },
      fy: {
        domain: AceScales.map((key) => AceScaleInfo[key].label),
        label: null,
        ticks: [],
      },
      color: {
        type: "categorical",
        ...ace_colour_scale,
      },
      marks: [
        Plot.axisX({
          tickSize: 0,
          ticks: [0, 20, 40, 60, 80, 100],
          labelAnchor: "center",
          labelArrow: "none",
          fontSize: "12pt",
        }),
        Plot.axisY({ ticks: [], label: null }),
        Plot.areaY(
          distribution_data.dementia.filter((x) => x.scale !== "Total"),
          {
            y: (d) => -1 * d.prop_scaled,
            fy: "scale",
            fill: "scale",
            fillOpacity: 1,
            sort: "score",
            stroke: "black",
            x: (d) => rescale_score(d.score, d.scale.toLowerCase()),
          }
        ),
        Plot.areaY(
          distribution_data.control.filter((x) => x.scale !== "Total"),
          {
            y: "prop_scaled",
            fy: "scale",
            fill: "scale",
            fillOpacity: 0.5,
            sort: "score",
            stroke: "black",
            x: (d) => rescale_score(d.score, d.scale.toLowerCase()),
          }
        ),
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
          strokeDasharray: "8,6",
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
  }, [bar_data, score_data, sd_threshold_data, spec_threshold_data, scores]);
  return (
    <div ref={containerRef}>
      <PlotSkeleton width={500} height={500} />
    </div>
  );
}
