"use client";
import { useFormContext, useWatch } from "react-hook-form";
import TotalScorePlot from "@/app/_plots/TotalScorePlot";
import AceForm from "@/app/_forms/AceForm";
import { Button, Card, FlowbiteCardTheme } from "flowbite-react";
import RiskPlot from "@/app/_plots/RiskPlot";
import model from "@/app/_model/model";
import ScoreBarPlot from "@/app/_plots/ScoreBarPlot";
import { NormPlotDisplay } from "@/app/_components/NormPlotDisplay";
import RiskContributionPlot from "@/app/_plots/RiskContributionPlot";
import { AceScaleScoresInput } from "@/app/_forms/schemas/ace";
import Link from "next/link";
import DistPlotSmall from "@/app/_plots/DistPlotSmall";

const NoPaddingCardTheme: FlowbiteCardTheme = {
  root: {
    base: "flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800",
    children: "flex h-full flex-col justify-start gap-4 p-2 md:p-6",
    horizontal: {
      off: "flex-col",
      on: "flex-col md:max-w-xl md:flex-row",
    },
    href: "hover:bg-gray-100 dark:hover:bg-gray-700",
  },
  img: {
    base: "",
    horizontal: {
      off: "rounded-t-lg",
      on: "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg",
    },
  },
};

/** Component that setups the ACE-III score form, creates the
 *  input form
 *  and passes its values to the different plots/visualisation components
 */
export default function ScoreWidget() {
  // Form context is set up in the root layout via AceFormProvider
  const form = useFormContext<AceScaleScoresInput>();
  const { control, formState } = form;
  // Need to subscribe to errors to get instant error validation
  const { errors } = formState;

  const current_value = useWatch({ control });
  return (
    <div
      id="ace-form"
      className="flex flex-col lg:flex-row lg:flex-wrap gap-2 md:gap-4 "
    >
      <AceForm
        form={form}
        id="score-entry"
        className="lg:grow max-w-sm transition-all delay-200 ease-in-out"
        theme={NoPaddingCardTheme}
      />
      <Card
        id="total-score-plots"
        className="max-w-xl"
        theme={NoPaddingCardTheme}
      >
        <div className="flex flex-col justify-start space-y-4">
          <ScoreBarPlot scores={current_value} />
          <p className="max-w-md text-center">
            See the density plots below to compare these subdomain scores to the
            distribution in dementia and control patients
          </p>
          <RiskPlot scores={current_value} model={model} />
          <RiskContributionPlot scores={current_value} model={model} />
        </div>
      </Card>
      <Card id="risk-plots" className="max-w-xl" theme={NoPaddingCardTheme}>
        <div className="flex flex-col justify-start space-y-4">
          <TotalScorePlot scores={current_value} />
          <Link className="mx-auto mt-4" href="/explore">
            <Button size="lg">Explore sample</Button>
          </Link>
          <p className="max-w-md">
            See how this patient compares to our sample -{" "}
            <Link className="text-indigo-600" href="/explore">
              explore this in more detail here
            </Link>
          </p>
          <DistPlotSmall />
        </div>
      </Card>
      <NormPlotDisplay
        id="swarm-plots"
        className="max-w-full w-full"
        scores={current_value}
      />
    </div>
  );
}
