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
import { AceScaleScores } from "@/app/_forms/schemas/ace";
import { colours } from "@/app/_utils/colours";

const WIDTH = 800;
const HEIGHT = 800;

type DataRow = {
  dementia: string;
  total: number;
  sex: string;
  learning_difficulties: string;
  age_group: string;
};

type DataRowWithFilter = DataRow & {
  excluded: boolean;
};

function filter_data(
  data: DataRow[],
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
  const score_form = useFormContext<AceScaleScores>();
  const { watch: watch_scores } = score_form;
  const scores = watch_scores();
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<DataRow[]>([]);
  const { valid, total } = useTotalScore(scores);

  const { watch } = form_return;
  const filters = watch();
  const filtered_data = filter_data(data, filters);

  useEffect(() => {
    const loadData = async () => {
      const full_data = await import("@/app/_model/full_data_v1.json");
      setData(full_data.data);
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
      fx: { padding: 0, label: null, axis: "top" },
      marks: [
        Plot.axisY({
          ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
          tickSize: 0,
          labelAnchor: "center",
          labelArrow: "none",
          fontSize: "12pt",
          labelOffset: 50,
        }),
        valid
          ? Plot.tickY([total], {
              stroke: colours.indigo600,
              marker: "circle-stroke",
              strokeWidth: 3,
              fill: colours.indigo600,
            })
          : null,
        Plot.dot(
          filtered_data,
          Plot.stackX({
            offset: "center",
            fx: "dementia",
            padding: 0.5,
            y: "total",
            fill: "dementia",
            r: 3.5,
            opacity: (d) => (d.excluded ? 0.25 : 1),
          })
        ),
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
        <PlotSkeleton width={WIDTH} height={HEIGHT} />
      </div>
    </>
  );
}
