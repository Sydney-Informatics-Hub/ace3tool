"use client";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AceScaleScores, AceScaleScoresSchema } from "@/app/_forms/schemas/ace";
import { DisplayTotal } from "@/app/_forms/components/DisplayTotal";
import ScorePlot from "@/app/_plots/ScorePlot";
import TotalScorePlot from "@/app/_plots/TotalScorePlot";
import AceForm from "@/app/_forms/AceForm";
import { Card } from "flowbite-react";
import model_data from "@/app/_data/logistic_model_v1.json";
import { LogisticModel } from "@/lib/logistic";
import RiskPlot from "@/app/_plots/RiskPlot";

export default function ScoreWidget() {
  const form = useForm<AceScaleScores>({
    mode: "all",
    defaultValues: AceScaleScoresSchema.getDefault(),
    resolver: yupResolver(AceScaleScoresSchema),
  });
  const { control, formState } = form;
  // Need to subscribe to errors to get instant error validation
  const { errors } = formState;

  // TODO: Need to get means for predictors, and set scale_predictors in the model
  //   options
  const model = new LogisticModel(model_data.coefs, {
    vcov: model_data.vcov,
  });

  const current_value = useWatch({ control });
  return (
    <div id="ace-form" className="flex flex-col lg:flex-row space-x-4">
      <AceForm form={form} />
      <Card id="data-display" className="flex-col max-w-xl space-y-4">
        <DisplayTotal scores={current_value} />
        <ScorePlot scores={current_value} />
        <TotalScorePlot scores={current_value} />
        <RiskPlot scores={current_value} model={model} />
      </Card>
    </div>
  );
}
