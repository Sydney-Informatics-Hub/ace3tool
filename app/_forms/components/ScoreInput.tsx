import { ComponentProps } from "react";
import { Label, TextInput } from "flowbite-react";
import { useFormContext } from "react-hook-form";

interface ScoreInputProps extends ComponentProps<typeof TextInput> {
  label: string;
  name: string;
}

export default function ScoreInput(props: ScoreInputProps) {
  const { label, name, ...input_props } = props;
  const { register, getFieldState } = useFormContext();
  const state = getFieldState(name);
  const input_id = `${name}_input`;
  const colour = state.isDirty
    ? state.invalid
      ? "failure"
      : "success"
    : undefined;

  return (
    <div>
      <Label htmlFor={input_id}>{label}</Label>
      <TextInput
        id={input_id}
        type="number"
        color={colour}
        {...register(name)}
        {...input_props}
      />
      {state.error && (
        <span className="text-sm text-red-400">{state.error.message}</span>
      )}
    </div>
  );
}
