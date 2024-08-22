import {
  AceScaleInfo,
  AceScales,
  AceScaleScores,
} from "@/app/_forms/schemas/ace";
import { LogisticModel } from "@/lib/logistic";
import data_summary from "@/app/_model/data_summary_v1.json";
import React, { useEffect, useRef } from "react";
import { useValidatedScores } from "@/app/_hooks/useValidatedScores";
import * as Plot from "@observablehq/plot";
import { colours } from "@/app/_utils/colours";
import PlotSkeleton from "@/app/_components/PlotSkeleton";

interface RiskContributionPlotProps {
  scores: Partial<AceScaleScores>;
  model: LogisticModel<keyof AceScaleScores>;
}

export default function RiskContributionPlot(props: RiskContributionPlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { model } = props;
  const { scores } = useValidatedScores(props.scores);
  const control_xb = model.get_xb_values(data_summary.control_means);
  const xb = scores ? model.get_xb_values(scores) : undefined;
  const xb_data = xb
    ? AceScales.map((key) => {
        const xb_vs_control = xb[key] - control_xb[key];
        return {
          scale: AceScaleInfo[key].label,
          value: xb_vs_control,
          fill: xb_vs_control > 0 ? colours.emerald600 : colours.red600,
        };
      })
    : undefined;

  useEffect(() => {
    const plot = Plot.plot({
      title: "Factors affecting predicted risk",
      x: {
        domain: AceScales.map((key) => AceScaleInfo[key].label),
        padding: 0.2,
      },
      y: { domain: [-5, 1] },
      color: { type: "diverging", domain: [-5, 5], scheme: "RdYlGn" },
      opacity: { range: [0.2, 1.0], domain: [-5, 5] },
      width: 500,
      height: 150,
      marks: [
        Plot.axisX({ tickSize: 0, label: null, anchor: "top" }),
        Plot.axisY({
          ticks: [],
          label: "Less risk",
          labelAnchor: "top",
          labelArrow: "up",
        }),
        Plot.axisY({
          ticks: [],
          label: "Greater risk",
          labelAnchor: "bottom",
          labelArrow: "down",
        }),
        Plot.ruleY([0], { stroke: "black", strokeWidth: 3 }),
        xb_data
          ? Plot.barY(xb_data, {
              y: "value",
              x: "scale",
              fill: "fill",
              fillOpacity: (d) => Math.abs(d.value),
            })
          : null,
      ],
    });
    containerRef?.current?.replaceChildren(plot);
    return () => plot.remove();
  }, [xb_data, model, scores]);
  return (
    <div ref={containerRef}>
      <PlotSkeleton width={500} height={150} />
    </div>
  );
}
