"use client";
import { SubmitHandler, FormProvider, UseFormReturn } from "react-hook-form";
import {
  AceScaleInfo,
  AceScales,
  AceScaleScores,
} from "@/app/_forms/schemas/ace";
import { Card, CardProps } from "flowbite-react";
import ScoreInput from "@/app/_forms/components/ScoreInput";

type AceFormProps = {
  form: UseFormReturn<AceScaleScores>;
} & CardProps;

export default function AceForm(props: AceFormProps) {
  const { form, ...card_props } = props;
  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<AceScaleScores> = (data) => console.log(data);
  return (
    <Card {...card_props}>
      <h2 className="text-xl font-bold text-indigo-600">
        Enter ACE-III subdomain scores
      </h2>
      <FormProvider {...form}>
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
      </FormProvider>
    </Card>
  );
}
