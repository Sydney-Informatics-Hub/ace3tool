import { Card, CardProps } from "flowbite-react";
import { AceScaleScores } from "@/app/_forms/schemas/ace";
import { LogisticModel } from "@/lib/logistic";
import SwarmPlot from "@/app/_plots/SwarmPlot";

type SwarmPlotDisplayProps = CardProps & {
  scores: Partial<AceScaleScores>;
  model: LogisticModel<keyof AceScaleScores>;
};

// TODO: creating the legend manually is not ideal
export function SwarmPlotDisplay(props: SwarmPlotDisplayProps) {
  const { scores, model, ...card_props } = props;
  return (
    <Card {...card_props}>
      <div className="flex flex-col lg:flex-row lg:flex-wrap">
        <div id="swarm-intro" className="lg:basis-1/2 text-base max-w-prose">
          <h2 className="text-indigo-600 font-bold text-lg">
            Subdomain scores
          </h2>
          <p>
            This plot compares the current scores for each subdomain to those
            from a sample of patients with dementia and healthy controls
          </p>
          <h3 className="text-lg text-indigo-800 font-bold mt-2">Legend</h3>
          <ul className="my-1 space-y-2">
            <li>
              <span className="inline-flex items-center text-indigo-600 text-base p-1 border-2 me-2">
                ●<hr className="w-4 h-1 bg-indigo-600" />●
              </span>
              Current score
            </li>
            <li>
              <span className="text-red-600 font-bold p-1 border-2 me-2">
                - - -
              </span>
              80% of dementia patients in the sample scored at or below this
              level
            </li>
            <li>
              <span className="text-xl text-gray-600 p-1 border-2 me-2">○</span>{" "}
              Sample patient with dementia
            </li>
            <li>
              <span className="text-xl text-black p-1 border-2 me-2">●</span>{" "}
              Control patient (no dementia)
            </li>
          </ul>
        </div>
        <div className="lg:basis-1/2">
          <SwarmPlot scores={scores} model={model} />
        </div>
      </div>
    </Card>
  );
}
