import { Card, CardProps, List } from "flowbite-react";
import { AceScaleScores } from "@/app/_forms/schemas/ace";
import { LogisticModel } from "@/lib/logistic";
import SwarmPlot from "@/app/_plots/SwarmPlot";
import { HTMLAttributes } from "react";

type SwarmPlotDisplayProps = CardProps & {
  scores: Partial<AceScaleScores>;
  model: LogisticModel<keyof AceScaleScores>;
};

function SwarmPlotLegend(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <h2 className="text-indigo-600 font-bold text-lg">Subdomain scores</h2>
      <p className="text-gray-800">
        This plot compares the current scores for each subdomain to those from a
        sample of patients with dementia and healthy controls
      </p>
      <h3 className="text-lg text-indigo-800 font-bold mt-2">Legend</h3>
      <List unstyled className="my-1 space-y-3">
        <List.Item>
          <span className="inline-flex items-center text-indigo-600 text-base p-1 border-2 me-2">
            ●<hr className="w-4 h-1 bg-indigo-600" />●
          </span>
          Current score
        </List.Item>
        <List.Item>
          <span className="text-red-600 font-bold p-1 border-2 me-2">
            - - -
          </span>
          80% of dementia patients in the sample scored at or below this level
        </List.Item>
        <List.Item>
          <span className="text-xl text-gray-600 p-1 border-2 me-2">○</span>{" "}
          Sample patient with dementia
        </List.Item>
        <List.Item>
          <span className="text-xl text-black p-1 border-2 me-2">●</span>{" "}
          Control patient (no dementia)
        </List.Item>
      </List>
    </div>
  );
}

// TODO: creating the legend manually is not ideal, not sure how else to do it
//   as observable plot doesn't seem to offer that level of customization
export function SwarmPlotDisplay(props: SwarmPlotDisplayProps) {
  const { scores, model, ...card_props } = props;
  return (
    <Card {...card_props}>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:basis-1/2">
          <SwarmPlot scores={scores} model={model} />
        </div>
        <SwarmPlotLegend
          id="swarm-legend"
          className="lg:basis-1/2 text-base max-w-prose"
        />
      </div>
    </Card>
  );
}
