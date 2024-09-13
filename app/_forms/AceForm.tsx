"use client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import {
  AceScaleInfo,
  AceScales,
  AceScaleScoresDefaultInputs,
  AceScaleScoresInput,
} from "@/app/_forms/schemas/ace";
import { Button, Card, CardProps } from "flowbite-react";
import ScoreInput from "@/app/_forms/components/ScoreInput";
import Link from "next/link";

type AceFormProps = {
  form: UseFormReturn<AceScaleScoresInput>;
} & CardProps;

export default function AceForm(props: AceFormProps) {
  const { form, ...card_props } = props;
  const { handleSubmit, reset } = form;

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
        <Button
          color="blue"
          className="mx-auto"
          size="lg"
          onClick={() => reset(AceScaleScoresDefaultInputs)}
        >
          Reset
        </Button>
      </form>
      <p>See how this patient compares to our sample:</p>
      <Link href="/explore">
        <Button>Explore sample</Button>
      </Link>
    </Card>
  );
}
