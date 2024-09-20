"use client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import {
  AceScaleInfo,
  AceScales,
  AceScaleScores,
  AceScaleScoresDefaultInputs,
  AceScaleScoresInput,
} from "@/app/_forms/schemas/ace";
import { Alert, Button, Card, CardProps, List } from "flowbite-react";
import ScoreInput from "@/app/_forms/components/ScoreInput";
import Link from "next/link";
import { useValidatedScores } from "@/app/_hooks/useValidatedScores";
import { DataSummary, get_extreme_scores } from "@/app/_model/model";
import real_data_with_total from "@/app/_model/data_summary_v1.json";
import * as _ from "radash";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import PlotTitleWithTooltip from "@/app/_components/PlotTitleWithTooltip";

const dementia_data_summary: DataSummary<keyof AceScaleScores> = {
  sds: _.omit(real_data_with_total.dementia_sds, ["total"]),
  means: _.omit(real_data_with_total.dementia_means, ["total"]),
};

type AceFormProps = {
  form: UseFormReturn<AceScaleScoresInput>;
} & CardProps;

function ExtremeScoreWarning(props: { scores: Partial<AceScaleScoresInput> }) {
  const { scores } = props;
  const validated_scores: Readonly<AceScaleScores> | undefined =
    useValidatedScores(scores).scores;
  const extreme_scores = validated_scores
    ? get_extreme_scores(validated_scores, dementia_data_summary, -2)
    : undefined;
  const has_extreme_score =
    extreme_scores !== undefined && extreme_scores.length > 0;
  if (!has_extreme_score) {
    return <></>;
  }
  return (
    <Alert color="info" icon={InformationCircleIcon}>
      This looks like an unusual score profile:
      <List className="text-inherit my-2">
        {extreme_scores.map((entry, index) => {
          return (
            <List.Item key={index}>
              Low {entry.predictor} compared to {entry.other_predictor}
            </List.Item>
          );
        })}
      </List>
      Check that you&apos;ve entered scores correctly, and be aware that the
      model may not give good predictions for unusual/extreme score profiles
    </Alert>
  );
}

export default function AceForm(props: AceFormProps) {
  const { form, ...card_props } = props;
  const { handleSubmit, reset, watch } = form;
  const current_scores = watch();

  const onSubmit: SubmitHandler<AceScaleScoresInput> = (data) =>
    console.log(data);
  return (
    <Card {...card_props}>
      <h1 className="text-xl font-bold text-indigo-600">
        ACE-III online dementia screening tool
      </h1>
      {/*TODO: add link to the paper here*/}
      <p className="text-base max-w-sm">
        This tool is based on data from Foxe et al.{" "}
        <i>
          Utility of the Addenbrooke’s Cognitive Examination-III Online Dementia
          Screening Tool
        </i>
        .<br />
        It is intended for use by clinicians experienced in administering the
        ACE-III. Please review the{" "}
        <Link className="text-indigo-600" href="/about">
          About
        </Link>{" "}
        section before proceeding.
      </p>
      <PlotTitleWithTooltip
        title="Enter ACE-III subdomain scores"
        tooltip_content="Scores entered here are not sent to our servers. All calculations are done locally in your browser"
      />
      <form
        className="flex flex-col max-w-lg gap-4 my-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {AceScales.map((scale) => {
          const label = AceScaleInfo[scale].label;
          const max = AceScaleInfo[scale].max;
          const full_label = `${label} (/${max})`;
          return <ScoreInput key={scale} label={full_label} name={scale} />;
        })}
        <ExtremeScoreWarning scores={current_scores} />
        <Button
          color="blue"
          className="mx-auto"
          size="lg"
          onClick={() => reset(AceScaleScoresDefaultInputs)}
        >
          Reset
        </Button>
      </form>
    </Card>
  );
}
