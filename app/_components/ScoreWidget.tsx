"use client";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AceScaleScores, AceScaleScoresSchema } from "@/app/_forms/schemas/ace";
import { DisplayTotal } from "@/app/_forms/components/DisplayTotal";
import ScorePlot from "@/app/_plots/ScorePlot";
import TotalScorePlot from "@/app/_plots/TotalScorePlot";
import AceForm from "@/app/_forms/AceForm";
import { Card, FlowbiteCardTheme } from "flowbite-react";
import RiskPlot from "@/app/_plots/RiskPlot";
import model from "@/app/_model/model";
import SwarmPlot from "@/app/_plots/SwarmPlot";
import SvgCircle from "@/app/_components/SvgCircle";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { XCircleIcon as OutlineCircleIcon } from "@heroicons/react/24/outline";

const NoPaddingCardTheme: FlowbiteCardTheme = {
  root: {
    base: "flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800",
    children: "flex h-full flex-col justify-center gap-4 p-2 md:p-6",
    horizontal: {
      off: "flex-col",
      on: "flex-col md:max-w-xl md:flex-row",
    },
    href: "hover:bg-gray-100 dark:hover:bg-gray-700",
  },
  img: {
    base: "",
    horizontal: {
      off: "rounded-t-lg",
      on: "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg",
    },
  },
};

export default function ScoreWidget() {
  const form = useForm<AceScaleScores>({
    mode: "all",
    defaultValues: AceScaleScoresSchema.getDefault(),
    resolver: yupResolver(AceScaleScoresSchema),
  });
  const { control, formState } = form;
  // Need to subscribe to errors to get instant error validation
  const { errors } = formState;

  const current_value = useWatch({ control });
  return (
    <div
      id="ace-form"
      className="flex flex-col lg:flex-row lg:flex-wrap md:space-x-4 space-y-4 "
    >
      <AceForm form={form} />
      <Card
        id="data-display-simple"
        className="flex-col max-w-xl space-y-4 min-w-96"
        theme={NoPaddingCardTheme}
      >
        <DisplayTotal scores={current_value} model={model} />
        <ScorePlot scores={current_value} />
      </Card>
      <Card id="risk-plots" className="flex-col max-w-xl space-y-4">
        <TotalScorePlot scores={current_value} />
        <RiskPlot scores={current_value} model={model} />
      </Card>
      <Card id="swarm-plots" className="flex-col max-w-xl space-y-4">
        <div id="swarm-intro" className="text-sm">
          The plot below shows the current scores in each subdomain as a line,
          compared to scores from the sample of patients. Sample patients with
          dementia are shown in white (
          <OutlineCircleIcon className="size-5 text-black  inline" />
          ), and those without dementia in black (
          <XCircleIcon className="size-5 text-black inline" />)
        </div>

        <SwarmPlot scores={current_value} model={model} />
      </Card>
    </div>
  );
}
