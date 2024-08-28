"use client";
import React, { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import { AceScaleScores } from "@/app/_forms/schemas/ace";
import { useTotalScore } from "@/app/_hooks/useTotalScore";
import PlotSkeleton from "@/app/_components/PlotSkeleton";
import { colours, tableau10_colours } from "@/app/_utils/colours";
import { bold_title } from "@/app/_plots/plot_utils";
import data_summary from "@/app/_model/data_summary_v1.json";
import distribution_data from "@/app/_model/dist_summary_v1.json";

type RiskLabels = "Moderate risk" | "Mild risk" | "Within normal limits";

type ScoreRange = {
  label: RiskLabels;
  min: number;
  max: number;
};

const Ranges: ScoreRange[] = [
  { label: "Moderate risk", min: 0, max: 82 },
  { label: "Mild risk", min: 82, max: 88 },
  { label: "Within normal limits", min: 88, max: 100 },
];

const WIDTH = 500;
const HEIGHT = 250;

interface TotalScorePlotProps {
  scores: Partial<AceScaleScores>;
}

const get_sd_threshold = () => {
  const mean = data_summary.control_means["total"];
  const sd = data_summary.control_sds["total"];
  return mean - 2 * sd;
};

export default function TotalScorePlot(props: TotalScorePlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scores } = props;
  const { valid, total } = useTotalScore(scores);
  const sd_threshold = get_sd_threshold();
  const spec_threshold = data_summary.specificity_100["total"];

  useEffect(() => {
    const plot = Plot.plot({
      title: bold_title(valid ? `Total score: ${total}` : "Total score"),
      width: WIDTH,
      height: HEIGHT,
      style: { fontSize: "10pt" },
      marginBottom: 50,
      x: {
        grid: true,
        label: "ACE-III total score",
        domain: [0, 100],
        reverse: true,
      },
      y: { domain: [-1, 1], label: null },
      color: {
        type: "categorical",
        scheme: "RdYlGn",
        range: [0, 1, 2],
        domain: ["Moderate risk", "Mild risk", "Within normal limits"],
        legend: true,
      },
      marks: [
        Plot.axisY({ ticks: [] }),
        Plot.axisX({ labelOffset: 40, labelAnchor: "center" }),
        Plot.rect(Ranges, {
          x1: "min",
          x2: "max",
          y1: 0.9,
          y2: 1.0,
          fillOpacity: 0.7,
          fill: "label",
        }),
        Plot.areaY(
          distribution_data.dementia.filter((x) => x.scale === "Total"),
          {
            y: (d) => -1 * d.prop_scaled,
            fill: tableau10_colours.yellow,
            fillOpacity: 1,
            sort: "score",
            stroke: "black",
            x: "score",
          }
        ),
        Plot.areaY(
          distribution_data.control.filter((x) => x.scale === "Total"),
          {
            y: "prop_scaled",
            fill: tableau10_colours.yellow,
            fillOpacity: 0.5,
            sort: "score",
            stroke: "black",
            x: "score",
          }
        ),
        Plot.tickX([sd_threshold], {
          stroke: colours.orange500,
          strokeDasharray: "1,4",
          strokeLinecap: "round",
          strokeWidth: 3,
        }),
        Plot.tickX([spec_threshold], {
          stroke: colours.red600,
          strokeDasharray: "8,6",
          strokeWidth: 3,
        }),
        // Only show total marker once we have a valid total
        valid
          ? Plot.tickX([{ score: total }], {
              x: "score",
              stroke: colours.indigo600,
              marker: "circle-stroke",
              strokeWidth: 3,
            })
          : null,
      ],
    });
    containerRef?.current?.replaceChildren(plot);
    return () => plot.remove();
  }, [valid, total, sd_threshold, spec_threshold]);
  return (
    <div ref={containerRef}>
      <PlotSkeleton width={WIDTH} height={HEIGHT} />
    </div>
  );
}
