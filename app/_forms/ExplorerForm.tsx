"use client";
import { UseFormReturn } from "react-hook-form";
import {
  ExplorerFilterNames,
  ExplorerFilters,
  ExplorerFilterSchema,
  FilterLabels,
  FilterOptions,
} from "@/app/_forms/schemas/explorer_filters";
import RadioInput from "@/app/_forms/components/RadioInput";
import { Button } from "flowbite-react";
import SelectInput from "@/app/_forms/components/SelectInput";

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
      <div className="flex flex-wrap gap-2">
        {ExplorerFilterNames.filter((field) => field !== "diagnosis").map(
          (field) => {
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
          }
        )}
        <SelectInput
          label={FilterLabels["diagnosis"]}
          name={"diagnosis"}
          options={FilterOptions["diagnosis"]}
          form_return={form_return}
          extra_content={
            <p className="mt-2 text-sm text-gray-500">
              *The bvFTD group included four patients with an undefined FTD
              syndrome
            </p>
          }
        />
      </div>
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
