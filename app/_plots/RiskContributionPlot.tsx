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
import { ace_colour_scale } from "@/app/_utils/colours";
import PlotSkeleton from "@/app/_components/PlotSkeleton";
import PlotTitleWithTooltip from "@/app/_components/PlotTitleWithTooltip";

interface RiskContributionPlotProps {
  scores: Partial<AceScaleScores>;
  model: LogisticModel<keyof AceScaleScores>;
}

const WIDTH = 500;
const HEIGHT = 200;

const Tooltip = () => {
  return (
    <>
      This plot shows the current patient&apos;s weights for each subdomain in
      the logistic regression model, compared to the average weight for control
      participants. <br />
      These weights correspond to the{" "}
      <a
        className="text-blue-600"
        href="https://christophm.github.io/interpretable-ml-book/shapley.html"
      >
        Shapley values
      </a>{" "}
      for the model.
      <br />
      Weights are on the log-odds scale, so don&apos;t correspond directly to
      probability, but you can compare the relative size of each weight.
    </>
  );
};

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
        };
      })
    : undefined;

  useEffect(() => {
    const plot = Plot.plot({
      style: { fontSize: "10pt" },
      x: {
        domain: AceScales.map((key) => AceScaleInfo[key].label),
        padding: 0.2,
      },
      y: { domain: [-5, 1] },
      color: { type: "categorical", ...ace_colour_scale },
      opacity: { range: [0.1, 1.0], domain: [-3, 3] },
      width: WIDTH,
      height: HEIGHT,
      marginBottom: 50,
      marginTop: 40,
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
        xb_data
          ? Plot.barY(xb_data, {
              y: "value",
              x: "scale",
              fill: "scale",
              fillOpacity: (d) => Math.abs(d.value),
            })
          : null,
        Plot.ruleY([0], { stroke: "black", strokeWidth: 3 }),
      ],
    });
    containerRef?.current?.replaceChildren(plot);
    return () => plot.remove();
  }, [xb_data, model, scores]);
  return (
    <div>
      <PlotTitleWithTooltip
        title={"Factors affecting risk"}
        tooltip_content={<Tooltip />}
      />
      <div ref={containerRef}>
        <PlotSkeleton width={WIDTH} height={HEIGHT} />
      </div>
    </div>
  );
}
