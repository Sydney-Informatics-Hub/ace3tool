import {
  AceScaleInfo,
  AceScales,
  AceScaleScores,
} from "@/app/_forms/schemas/ace";
import { LogisticModel } from "@/lib/logistic";
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
  const xb = scores ? model.get_xb_values(scores) : undefined;
  const xb_data = xb
    ? AceScales.map((key) => ({
        scale: AceScaleInfo[key].label,
        value: xb[key],
        fill: xb[key] > 0 ? colours.emerald600 : colours.red600,
      }))
    : undefined;

  useEffect(() => {
    const plot = Plot.plot({
      title: "Contributions to risk",
      x: {
        domain: AceScales.map((key) => AceScaleInfo[key].label),
        padding: 0.2,
      },
      y: { domain: [-5, 5] },
      color: { type: "diverging", domain: [-5, 5], scheme: "RdYlGn" },
      opacity: { range: [0.2, 1.0] },
      width: 500,
      height: 150,
      marks: [
        Plot.axisX({ tickSize: 0, label: null }),
        Plot.axisY({
          ticks: [],
          label: "Less risk",
          labelAnchor: "top",
          labelArrow: "up",
        }),
        Plot.axisY({
          ticks: [],
          label: "More risk",
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
