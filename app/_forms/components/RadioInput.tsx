"use client";
import { Label, Radio } from "flowbite-react";
import { ComponentProps } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface RadioInputProps<Data extends FieldValues>
  extends ComponentProps<typeof Radio> {
  label: string;
  name: Path<Data>;
  options: string[];
  form_return: UseFormReturn<Data>;
}

export default function RadioInput<Data extends FieldValues>(
  props: RadioInputProps<Data>
) {
  const { label, name, options, form_return, ...inputProps } = props;
  const { register, getFieldState } = form_return;
  const state = getFieldState(name);
  const colour = state.isDirty
    ? state.invalid
      ? "failure"
      : "success"
    : undefined;

  return (
    <fieldset>
      <legend className="mb-2 font-semibold text-base">{label}</legend>
      {options.map((option, index) => {
        const option_id = `${name}-option-${index}`;
        return (
          <div key={index} className="flex items-center gap-2">
            <Radio value={option} id={option_id} {...register(name)} />
            <Label htmlFor={option_id}>{option}</Label>
          </div>
        );
      })}
    </fieldset>
  );
}
