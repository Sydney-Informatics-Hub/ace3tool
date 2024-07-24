"use client";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AceScaleScores, AceScaleScoresSchema } from "@/app/_forms/schemas/ace";
import { DisplayTotal } from "@/app/_forms/components/DisplayTotal";
import ScorePlot from "@/app/_plots/ScorePlot";
import TotalScorePlot from "@/app/_plots/TotalScorePlot";
import AceForm from "@/app/_forms/AceForm";
import { Card } from "flowbite-react";
import RiskPlot from "@/app/_plots/RiskPlot";
import model from "@/app/_model/model";

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
      className="flex flex-col lg:flex-row lg:flex-wrap space-x-4 space-y-4 "
    >
      <AceForm form={form} />
      <Card
        id="data-display-simple"
        className="flex-col max-w-xl space-y-4 min-w-96"
      >
        <DisplayTotal scores={current_value} model={model} />
        <ScorePlot scores={current_value} />
      </Card>
      <Card id="risk-plots" className="flex-col max-w-xl space-y-4">
        <TotalScorePlot scores={current_value} />
        <RiskPlot scores={current_value} model={model} />
      </Card>
    </div>
  );
}
