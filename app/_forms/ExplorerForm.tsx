"use client";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ExplorerFilterNames,
  ExplorerFilters,
  ExplorerFilterSchema,
  FilterLabels,
  FilterOptions,
} from "@/app/_forms/schemas/explorer_filters";
import RadioInput from "@/app/_forms/components/RadioInput";
import { Button } from "flowbite-react";

interface ExplorerFormProps {
  form_return: UseFormReturn<ExplorerFilters>;
}

export default function ExplorerForm(props: ExplorerFormProps) {
  const { form_return } = props;
  const { reset } = form_return;
  const resetFilters = () => {
    reset(ExplorerFilterSchema.getDefault());
  };

  return (
    <form className="flex flex-col gap-2">
      {ExplorerFilterNames.map((field) => {
        const options = FilterOptions[field];
        return (
          <RadioInput
            key={field}
            label={FilterLabels[field]}
            name={field}
            options={options}
            form_return={form_return}
          />
        );
      })}
      <Button
        className="my-2 w-48"
        gradientDuoTone="purpleToBlue"
        size="md"
        onClick={() => resetFilters()}
      >
        Reset filters
      </Button>
    </form>
  );
}
