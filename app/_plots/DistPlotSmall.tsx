"use client";
import * as Plot from "@observablehq/plot";
import React, { useEffect, useRef, useState } from "react";
import PlotSkeleton from "@/app/_components/PlotSkeleton";
import { useFormContext } from "react-hook-form";
import { useTotalScore } from "@/app/_hooks/useTotalScore";
import { AceScaleScoresInput } from "@/app/_forms/schemas/ace";
import { colours } from "@/app/_utils/colours";
import uniform from "@stdlib/random-base-uniform";

const WIDTH = 500;
const HEIGHT = 250;

type DataRow = {
  dementia: string;
  total: number;
  visit_number: string;
  education: string;
  sex: string;
  learning_difficulties: string;
  goldman_score: string;
  age_group: string;
};

type DataRowWithJitter = DataRow & {
  jitter: number;
};

export default function DistPlotSmall() {
  const score_form = useFormContext<AceScaleScoresInput>();
  const { watch: watch_scores } = score_form;
  const scores = watch_scores();
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<DataRowWithJitter[]>([]);
  const { valid, total } = useTotalScore(scores);

  // We want to jitter the points, but keep them in a consistent spot as
  //   we filter etc., so apply jitter from a seeded RNG when loading
  useEffect(() => {
    const loadData = async () => {
      const rng = uniform.factory(0.0, 1.0, { seed: 12345 });
      const full_data = await import("@/app/_model/full_data_v1.json");
      const with_jitter = full_data.data.map((row) => {
        return { ...row, jitter: rng() };
      });
      setData(with_jitter);
    };
    loadData();
  }, []);

  useEffect(() => {
    const plot = Plot.plot({
      width: WIDTH,
      height: HEIGHT,
      marginTop: 10,
      marginBottom: 60,
      style: { fontSize: "10pt" },
      x: {
        domain: [0, 105],
        label: "ACE-III total score",
        reverse: true,
        grid: true,
      },
      y: { domain: [-0.1, 1.1] },
      color: { type: "categorical", scheme: "pastel1", legend: true },
      marks: [
        Plot.axisY({ ticks: [], label: null }),
        Plot.axisX({
          ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
          tickSize: 0,
          labelAnchor: "center",
          labelArrow: "none",
          fontSize: "12pt",
          labelOffset: 50,
        }),
        Plot.dot(data, {
          y: "jitter",
          x: "total",
          fill: "dementia",
          r: 3.5,
        }),
        valid
          ? Plot.tickX([total], {
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
  }, [data, total, valid]);

  return (
    <>
      <div ref={containerRef}>
        <PlotSkeleton className="w-500px h-250px" />
      </div>
    </>
  );
}
