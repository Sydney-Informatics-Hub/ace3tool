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
} from "recharts";
import { AceScaleScores, AceScales } from "@/app/_forms/schemas/ace";
import { schemeTableau10 } from "d3-scale-chromatic";

interface ScorePlotProps {
  scores: Partial<AceScaleScores>;
}

export default function ScorePlot(props: ScorePlotProps) {
  const { scores } = props;
  const data = AceScales.map((scale) => {
    return { y: scores[scale], name: scale };
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} width={100} height={100}>
        <CartesianGrid strokeDasharray="1" />
        <XAxis name="Scale" dataKey="name" />
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
