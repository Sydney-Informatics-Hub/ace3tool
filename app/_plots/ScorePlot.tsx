"use client";
import React from "react";
import {
  ResponsiveContainer,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Cell,
  YAxis,
  XAxisProps,
  LabelProps,
} from "recharts";
import { AceScaleScores, AceScales } from "@/app/_forms/schemas/ace";
import { schemeTableau10 } from "d3-scale-chromatic";

interface ScorePlotProps {
  scores: Partial<AceScaleScores>;
}

const CustomizedAxisTick = (props: any) => {
  const { x, y, stroke, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        dx={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
};

export default function ScorePlot(props: ScorePlotProps) {
  const { scores } = props;
  const data = AceScales.map((scale) => {
    return { y: scores[scale], name: scale };
  });

  return (
    <ResponsiveContainer width="100%" height={500} minWidth={300}>
      <BarChart
        data={data}
        width={100}
        height={100}
        margin={{ top: 0, right: 20, bottom: 0, left: 0 }}
      >
        <CartesianGrid strokeDasharray="1" />
        <XAxis
          name="Scale"
          dataKey="name"
          tick={<CustomizedAxisTick />}
          height={50}
        />
        <YAxis name="Y" dataKey="y" domain={[0, 30]} />
        <Bar dataKey="y">
          {data.map((entry, index) => {
            return <Cell fill={schemeTableau10[index]} key={entry.name} />;
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
