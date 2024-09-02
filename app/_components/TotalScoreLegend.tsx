"use client";
import AreaIcon from "@/app/_components/AreaIcon";
import { LegendTable } from "@/app/_components/VerticalLegend";

const legend_items = [
  {
    label: "Distribution in control participants",
    icon: (
      <AreaIcon
        height={32}
        width={32}
        className="inline text-yellow-200 opacity-50 fill-current stroke-black stroke-2"
      />
    ),
  },
  {
    icon: (
      <AreaIcon
        height={32}
        width={32}
        className="inline text-yellow-200 fill-current stroke-black stroke-2 rotate-180"
      />
    ),
    label: "Distribution in dementia patients",
  },
  {
    icon: (
      <span className="inline-flex items-center justify-center text-indigo-600 text-base font-bold">
        ○<hr className="w-3 h-1 bg-indigo-600" />○
      </span>
    ),
    label: "Current score",
  },
  {
    icon: <span className="text-orange-500 font-bold text-lg">······</span>,
    label: "2 SDs below the mean for control patients",
  },
  {
    icon: <span className="text-red-600 font-bold">- - - -</span>,
    label: "100% specificity for detecting dementia in our sample",
  },
];

export default function TotalScoreLegend() {
  return <LegendTable items={legend_items} />;
}
