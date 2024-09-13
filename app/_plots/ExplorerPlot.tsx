"use client";
import * as Plot from "@observablehq/plot";
import React, { useEffect, useRef, useState } from "react";
import PlotTitle from "@/app/_components/PlotTitle";
import PlotSkeleton from "@/app/_components/PlotSkeleton";
import {
  ExplorerFilterNames,
  ExplorerFilters,
} from "@/app/_forms/schemas/explorer_filters";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { useTotalScore } from "@/app/_hooks/useTotalScore";
import { AceScaleScores, AceScaleScoresInput } from "@/app/_forms/schemas/ace";
import { colours } from "@/app/_utils/colours";
import uniform from "@stdlib/random-base-uniform";

const WIDTH = 800;
const HEIGHT = 800;

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

type DataRowWithFilter = DataRowWithJitter & {
  excluded: boolean;
};

export function filter_data(
  data: DataRowWithJitter[],
  filters: ExplorerFilters
): DataRowWithFilter[] {
  return data.map((row) => {
    const included = ExplorerFilterNames.map((field) => {
      return filters[field] === "All" || row[field] === filters[field];
    }).every((x) => x);
    return { ...row, excluded: !included };
  });
}

interface ExplorerPlotProps {
  form_return: UseFormReturn<ExplorerFilters>;
}

export default function ExplorerPlot(props: ExplorerPlotProps) {
  const { form_return } = props;
  const score_form = useFormContext<AceScaleScoresInput>();
  const { watch: watch_scores } = score_form;
  const scores = watch_scores();
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<DataRowWithJitter[]>([]);
  const { valid, total } = useTotalScore(scores);

  const { watch } = form_return;
  const filters = watch();
  const filtered_data = filter_data(data, filters);

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
      marginLeft: 50,
      marginTop: 50,
      style: { fontSize: "10pt" },
      y: { domain: [0, 105], label: "ACE-III total score" },
      x: { domain: [-0.1, 1.1] },
      fx: { padding: 0, label: null, axis: "top" },
      color: { type: "categorical", scheme: "pastel1" },
      marks: [
        Plot.axisX({ ticks: [], label: null }),
        Plot.axisY({
          ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
          tickSize: 0,
          labelAnchor: "center",
          labelArrow: "none",
          fontSize: "12pt",
          labelOffset: 50,
        }),
        Plot.dot(filtered_data, {
          fx: "dementia",
          x: "jitter",
          y: "total",
          fill: "dementia",
          r: 3.5,
          opacity: (d) => (d.excluded ? 0.0 : 0.9),
        }),
        valid
          ? Plot.tickY([total], {
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
  }, [data, filtered_data, total, valid]);

  return (
    <>
      <PlotTitle>Explore ACE-III scores</PlotTitle>
      {data.length === 0 && <>Loading...</>}
      <div ref={containerRef}>
        <PlotSkeleton className="w-800px h-800px" />
      </div>
    </>
  );
}
