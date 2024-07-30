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
import { PlotPlaceholder } from "@/app/_components/PlotPlaceholder";
import { randomInt } from "mathjs";
import { number_range } from "@/app/_utils/utils";

const fake_data = AceScales.map((scale) => {
  return number_range(50).map((x) => {
    const score = randomInt(40, 100);
    const dementia = Math.random() + score / 100 < 1.0;
    const dementia_fill = dementia ? "white" : "black";
    return { scale: AceScaleInfo[scale].label, score, dementia, dementia_fill };
  });
}).flat();

interface SwarmPlotProps {
  scores: Partial<AceScaleScores>;
  model: LogisticModel<keyof AceScaleScores>;
}

export default function SwarmPlot(props: SwarmPlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { model } = props;
  const { scores } = useValidatedScores(props.scores);
  // NOTE: the model is currently coded with "non-dementia" as the *positive*
  //   outcome, so we need 1 - risk for the risk of dementia
  const risk = scores ? 1 - model.predict(scores) : undefined;
  const bar_data = AceScales.map((key) => {
    return { scale: AceScaleInfo[key].label, height: 100 };
  });
  const score_data = AceScales.map((key) => {
    const scaled_score = scores
      ? (scores[key] / AceScaleInfo[key].max) * 100
      : undefined;
    return { scale: AceScaleInfo[key].label, value: scaled_score };
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
      fx: { domain: AceScales.map((key) => AceScaleInfo[key].label) },
      color: {
        type: "categorical",
        scheme: "Tableau10",
      },
      marks: [
        Plot.axisY({ ticks: [], labelAnchor: "center", labelArrow: "none" }),
        Plot.barY(bar_data, {
          y: "height",
          fill: "scale",
          fx: "scale",
          opacity: 0.5,
          stroke: "black",
          strokeOpacity: 1,
        }),
        Plot.dot(
          fake_data,
          Plot.dodgeX("middle", {
            fx: "scale",
            y: "score",
            fill: "dementia_fill",
          })
        ),
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
  }, [risk, bar_data, score_data]);
  return (
    <div ref={containerRef}>
      <PlotPlaceholder />
    </div>
  );
}
