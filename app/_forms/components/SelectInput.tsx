"use client";
import { Label, Select, SelectProps } from "flowbite-react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface SelectInputProps<Data extends FieldValues> extends SelectProps {
  label: string;
  name: Path<Data>;
  options: string[];
  form_return: UseFormReturn<Data>;
}

export default function SelectInput<Data extends FieldValues>(
  props: SelectInputProps<Data>
) {
  const { label, name, options, form_return, ...select_props } = props;
  const { register } = form_return;
  const input_id = `${name}_input`;
  return (
    <div className="max-w-md bg-gray-100 p-2 rounded-md">
      <div className="mb-2 block">
        <Label htmlFor={input_id} className="font-semibold text-sm">
          {label}
        </Label>
      </div>
      <Select defaultValue={"All"} {...register(name)}>
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </Select>
    </div>
  );
}
