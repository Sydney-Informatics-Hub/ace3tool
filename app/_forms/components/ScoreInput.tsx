import { ComponentProps } from "react";
import { Label, TextInput } from "flowbite-react";
import { UseFormReturn } from "react-hook-form";

interface InputProps extends ComponentProps<typeof TextInput> {
  label: string;
  name: string;
  form_return: UseFormReturn;
}

export default function Input(props: InputProps) {
  const { label, name, form_return, ...input_props } = props;

  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <TextInput
        type="number"
        color={attention_valid}
        {...register("attention")}
      />
    </>
  );
}
