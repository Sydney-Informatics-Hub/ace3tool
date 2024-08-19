import { Card, CardProps, List } from "flowbite-react";
import { AceScaleScores } from "@/app/_forms/schemas/ace";
import { LogisticModel } from "@/lib/logistic";
import NormPlot from "@/app/_plots/NormPlot";
import { HTMLAttributes } from "react";

type SwarmPlotDisplayProps = CardProps & {
  scores: Partial<AceScaleScores>;
  model: LogisticModel<keyof AceScaleScores>;
};

function NormPlotLegend(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <h2 className="text-indigo-600 font-bold text-lg">Subdomain scores</h2>
      <p className="text-gray-800">
        This plot compares the current scores for each subdomain to scores from
        healthy controls. <br />
        Scores are shown as a percentage of the maximum for each subdomain.
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
          <span className="text-orange-500 font-bold p-1 border-2 me-2">
            ·······
          </span>
          2 SDs below the mean for control patients
        </List.Item>
      </List>
    </div>
  );
}

// TODO: creating the legend manually is not ideal, not sure how else to do it
//   as observable plot doesn't seem to offer that level of customization
export function NormPlotDisplay(props: SwarmPlotDisplayProps) {
  const { scores, model, ...card_props } = props;
  return (
    <Card {...card_props}>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:basis-1/2">
          <NormPlot scores={scores} model={model} />
        </div>
        <NormPlotLegend
          id="swarm-legend"
          className="lg:basis-1/2 text-base max-w-prose"
        />
      </div>
    </Card>
  );
}
