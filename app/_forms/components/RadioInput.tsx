"use client";
import { Label, Radio } from "flowbite-react";
import { HTMLProps } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface RadioInputProps<Data extends FieldValues>
  extends HTMLProps<HTMLFieldSetElement> {
  label: string;
  name: Path<Data>;
  options: string[];
  form_return: UseFormReturn<Data>;
}

export default function RadioInput<Data extends FieldValues>(
  props: RadioInputProps<Data>
) {
  const { label, name, options, form_return, ...fieldset_props } = props;
  const { register, getFieldState } = form_return;
  const state = getFieldState(name);
  const colour = state.isDirty
    ? state.invalid
      ? "failure"
      : "success"
    : undefined;

  return (
    <div className="bg-gray-100 p-1 rounded-md">
      <fieldset className="p-2 flex flex-col gap-1" {...fieldset_props}>
        <legend className="font-semibold text-sm">{label}</legend>
        {options.map((option, index) => {
          const option_id = `${name}-option-${index}`;
          return (
            <div key={index} className="flex items-center gap-2 h-6">
              <Radio
                className="size-4"
                value={option}
                id={option_id}
                {...register(name)}
              />
              <Label htmlFor={option_id}>{option}</Label>
            </div>
          );
        })}
      </fieldset>
    </div>
  );
}
