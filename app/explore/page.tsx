"use client";
import { Card } from "flowbite-react";
import ExplorerPlot from "@/app/_plots/ExplorerPlot";
import ExplorerForm from "@/app/_forms/ExplorerForm";
import { useForm } from "react-hook-form";
import {
  ExplorerFilters,
  ExplorerFilterSchema,
} from "@/app/_forms/schemas/explorer_filters";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import PlotTitle from "@/app/_components/PlotTitle";
import { NoPaddingCardTheme } from "@/app/_components/ScoreWidget";

export default function Explore() {
  // NOTE: not using form context/form provider here as we use it
  //   for the score input, and wrap it around the entire app.
  //   Apparently nested form providers can cause issues.
  const form = useForm<ExplorerFilters>({
    mode: "all",
    defaultValues: ExplorerFilterSchema.getDefault(),
    resolver: yupResolver(ExplorerFilterSchema),
  });
  return (
    <main className="container mx-auto min-h-screen md:p-2">
      <div className="flex flex-col md:flex-row md:flex-wrap justify-start items-center gap-2 md:gap-4">
        <Card className="md:max-w-md">
          <h2 className="text-lg text-indigo-600 font-bold">
            Explore our sample
          </h2>
          <p>
            Use the filters here to explore the sample based on various
            characteristics. If you{" "}
            <Link className="text-indigo-600 inline" href="/">
              enter scores for a patient
            </Link>{" "}
            their score will be plotted so you can compare them to the sample.
          </p>
          <PlotTitle>Filters</PlotTitle>
          <ExplorerForm form_return={form} />
        </Card>
        <Card className="min-w-96" theme={NoPaddingCardTheme}>
          <ExplorerPlot form_return={form} />
        </Card>
      </div>
    </main>
  );
}
