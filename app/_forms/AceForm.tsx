"use client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import {
  AceScaleInfo,
  AceScales,
  AceScaleScores,
} from "@/app/_forms/schemas/ace";
import { Button, Card, CardProps } from "flowbite-react";
import ScoreInput from "@/app/_forms/components/ScoreInput";
import Link from "next/link";

type AceFormProps = {
  form: UseFormReturn<AceScaleScores>;
} & CardProps;

export default function AceForm(props: AceFormProps) {
  const { form, ...card_props } = props;
  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<AceScaleScores> = (data) => console.log(data);
  return (
    <Card {...card_props}>
      <h1 className="text-xl font-bold text-indigo-600">
        ACE-III online dementia screening tool
      </h1>
      <p className="text-base max-w-sm">
        This tool is based on data from{" "}
        <a
          href="https://doi.org/10.1016/S1474-4422(23)00414-3"
          className="text-blue-700"
        >
          Foxe (2024)
        </a>
        :{" "}
        <i>
          Demographic, clinical, biomarker, and neuropathological correlates of
          posterior cortical atrophy: an international cohort study and
          individual participant data meta-analysis
        </i>
      </p>
      <h2 className="text-xl font-bold text-indigo-600">
        Enter ACE-III subdomain scores
      </h2>
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
      </form>
      <p>See how this patient compares to our sample:</p>
      <Link href="/explore">
        <Button>Explore sample</Button>
      </Link>
    </Card>
  );
}
