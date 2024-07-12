"use client";
import {
  FieldError,
  FieldName,
  FormState,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AceScaleScores, AceScaleScoresSchema } from "@/app/_forms/schemas/ace";
import {
  Button,
  FloatingLabel,
  FloatingLabelColor,
  FlowbiteColors,
  FlowbiteStateColors,
  FlowbiteTextInputColors,
  Label,
  TextInput,
} from "flowbite-react";
import { DisplayTotal } from "@/app/_forms/components/DisplayTotal";
import ScorePlot from "@/app/_forms/components/ScorePlot";

export default function AceForm() {
  const { control, handleSubmit, register, formState } =
    useForm<AceScaleScores>({
      mode: "onBlur",
      defaultValues: AceScaleScoresSchema.getDefault(),
      resolver: yupResolver(AceScaleScoresSchema),
    });

  const current_value = useWatch({ control });
  const onSubmit: SubmitHandler<AceScaleScores> = (data) => console.log(data);
  const validateField = (
    field: FieldName<AceScaleScores>,
    form_state: FormState<AceScaleScores>
  ): keyof FlowbiteTextInputColors | undefined => {
    if (form_state.dirtyFields[field]) {
      if (form_state.errors[field] !== undefined) {
        return "failure";
      }
      return "success";
    }
    return undefined;
  };
  const attention_valid = validateField("attention", formState);

  return (
    <div id="ace-form" className="flex-col">
      <form
        className="flex flex-wrap max-w-lg gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label htmlFor="attention">Attention</Label>
        <TextInput
          type="number"
          color={attention_valid}
          {...register("attention")}
        />
        <FloatingLabel
          label="Fluency"
          variant="outlined"
          type="number"
          {...register("fluency")}
        />
        <FloatingLabel
          label="Memory"
          variant="outlined"
          type="number"
          {...register("memory")}
        />
        <FloatingLabel
          label="Language"
          variant="outlined"
          type="number"
          {...register("language")}
        />
        <FloatingLabel
          label="Visuospatial"
          variant="outlined"
          type="number"
          {...register("visual")}
        />
        <Button type="submit">Submit</Button>
      </form>
      <div id="data-display" className="flex-col max-w-lg">
        <DisplayTotal scores={current_value} />
        <ScorePlot scores={current_value} />
      </div>
    </div>
  );
}
