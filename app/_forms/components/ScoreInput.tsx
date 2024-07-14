import { ComponentProps } from "react";
import { Label, TextInput } from "flowbite-react";
import { UseFormReturn } from "react-hook-form";

interface ScoreInputProps extends ComponentProps<typeof TextInput> {
  label: string;
  name: string;
  form_return: UseFormReturn;
}

export default function ScoreInput(props: ScoreInputProps) {
  const { label, name, form_return, ...input_props } = props;
  const { register, getFieldState } = form_return;
  const state = getFieldState(name);
  const colour = state.isDirty
    ? state.invalid
      ? "failure"
      : "success"
    : undefined;

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <TextInput type="number" color={colour} {...register(name)} />
      {state.error && state.error.message}
    </div>
  );
}
