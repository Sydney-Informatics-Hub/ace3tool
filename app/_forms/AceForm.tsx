"use client";
import {
  SubmitHandler,
  useForm,
  useWatch,
  FormProvider,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AceScaleScores, AceScaleScoresSchema } from "@/app/_forms/schemas/ace";
import { Button } from "flowbite-react";
import { DisplayTotal } from "@/app/_forms/components/DisplayTotal";
import ScorePlot from "@/app/_forms/components/ScorePlot";
import ScoreInput from "@/app/_forms/components/ScoreInput";

export default function AceForm() {
  const form = useForm<AceScaleScores>({
    mode: "all",
    defaultValues: AceScaleScoresSchema.getDefault(),
    resolver: yupResolver(AceScaleScoresSchema),
  });
  const { control, handleSubmit, formState } = form;
  // Need to subscribe to errors to get instant error validation
  const { errors } = formState;

  const current_value = useWatch({ control });
  const onSubmit: SubmitHandler<AceScaleScores> = (data) => console.log(data);
  return (
    <FormProvider {...form}>
      <div id="ace-form" className="flex-col">
        <form
          className="flex flex-wrap max-w-lg gap-4 my-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ScoreInput label="Attention" name="attention" />
          <ScoreInput label="Memory" name="memory" />
          <ScoreInput label="Fluency" name="fluency" />
          <ScoreInput label="Language" name="language" />
          <ScoreInput label="Visuospatial" name="visual" />
        </form>
        <Button type="submit" className="my-2">
          Submit
        </Button>
        <div id="data-display" className="flex-col max-w-lg gap-4">
          <DisplayTotal scores={current_value} />
          <ScorePlot scores={current_value} />
        </div>
      </div>
    </FormProvider>
  );
}
