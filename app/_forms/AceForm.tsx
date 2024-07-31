"use client";
import { SubmitHandler, FormProvider, UseFormReturn } from "react-hook-form";
import { AceScaleScores } from "@/app/_forms/schemas/ace";
import { Card } from "flowbite-react";
import ScoreInput from "@/app/_forms/components/ScoreInput";

interface AceFormProps {
  form: UseFormReturn<AceScaleScores>;
}

export default function AceForm(props: AceFormProps) {
  const { form } = props;
  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<AceScaleScores> = (data) => console.log(data);
  return (
    <Card className="max-w-xl" id="score-entry">
      <h2 className="text-2xl font-bold text-indigo-700">
        Enter ACE-III scale scores
      </h2>
      <FormProvider {...form}>
        <form
          className="flex flex-col max-w-lg gap-4 my-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ScoreInput label="Attention" name="attention" />
          <ScoreInput label="Memory" name="memory" />
          <ScoreInput label="Fluency" name="fluency" />
          <ScoreInput label="Language" name="language" />
          <ScoreInput label="Visuospatial" name="visuospatial" />
        </form>
      </FormProvider>
    </Card>
  );
}
