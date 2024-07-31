import { Card, CardProps } from "flowbite-react";
import { AceScaleScores } from "@/app/_forms/schemas/ace";
import { LogisticModel } from "@/lib/logistic";
import SwarmPlot from "@/app/_plots/SwarmPlot";

type SwarmPlotDisplayProps = CardProps & {
  scores: Partial<AceScaleScores>;
  model: LogisticModel<keyof AceScaleScores>;
};

export function SwarmPlotDisplay(props: SwarmPlotDisplayProps) {
  const { scores, model, ...card_props } = props;
  return (
    <Card {...card_props}>
      <div className="flex flex-col lg:flex-row lg:flex-wrap">
        <div id="swarm-intro" className="lg:basis-1/2 text-base max-w-prose">
          The plot below shows the current scores in each subdomain as a line,
          compared to scores from the sample of patients. Sample patients with
          dementia are shown in white (⚪), and those without dementia in black
          (⚫).
        </div>
        <div className="lg:basis-1/2">
          <SwarmPlot scores={scores} model={model} />
        </div>
      </div>
    </Card>
  );
}
