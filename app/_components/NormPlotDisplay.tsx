import { Card, CardProps, Table } from "flowbite-react";
import { AceScaleScores } from "@/app/_forms/schemas/ace";
import NormPlot from "@/app/_plots/NormPlot";
import { HTMLAttributes, ReactNode } from "react";
import AreaIcon from "@/app/_components/AreaIcon";

type NormPlotDisplayProps = CardProps & {
  scores: Partial<AceScaleScores>;
};

interface LegendTableItem {
  icon: ReactNode;
  label: string;
}

const legend_items = [
  {
    label: "Distribution in control participants",
    icon: (
      <AreaIcon
        height={32}
        width={32}
        className="inline text-red-500 opacity-50 fill-current stroke-black stroke-2"
      />
    ),
  },
  {
    icon: (
      <AreaIcon
        height={32}
        width={32}
        className="inline text-red-500 fill-current stroke-black stroke-2 rotate-180"
      />
    ),
    label: "Distribution in dementia patients",
  },
  {
    icon: (
      <span className="inline-flex items-center justify-center text-indigo-600 text-base font-bold">
        ○<hr className="w-3 h-1 bg-indigo-600" />○
      </span>
    ),
    label: "Current score",
  },
  {
    icon: <span className="text-orange-500 font-bold text-lg">······</span>,
    label: "2 SDs below the mean for control patients",
  },
  {
    icon: <span className="text-red-600 font-bold">- - - -</span>,
    label: "100% specificity for detecting dementia in our sample",
  },
];

/**
 * Create the plot legend as table, where each row has an icon (can be any
 * React element) and a label.
 * @param props list of LegendTableItems, in order
 */
function LegendTable(props: { items: LegendTableItem[] }) {
  return (
    <Table className="table-fixed">
      <Table.Body>
        {props.items.map((item, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell
                className={
                  "p-2 w-12 h-12 border-2 align-middle justify-center items-center text-center"
                }
              >
                {item.icon}
              </Table.Cell>
              <Table.Cell className="p-2 h-12">{item.label}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}

function NormPlotLegend(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <h2 className="text-indigo-600 font-bold text-lg">Subdomain scores</h2>
      <p className="text-gray-800">
        This plot compares the current scores for each subdomain to scores from
        healthy controls. <br />
        Scores are shown as a percentage of the maximum for each subdomain.
      </p>
      <h3 className="text-base text-indigo-600 font-bold my-2">Legend</h3>
      <LegendTable items={legend_items} />
    </div>
  );
}

/**
 * Show the NormPlot, which compares a patient's scores to the overall
 * distribution, along with its legend, in a card.
 * @param props
 * @constructor
 */
export function NormPlotDisplay(props: NormPlotDisplayProps) {
  const { scores, ...card_props } = props;
  return (
    <Card {...card_props}>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:basis-1/2">
          <NormPlot scores={scores} />
        </div>
        <NormPlotLegend
          id="swarm-legend"
          className="lg:basis-1/2 text-base max-w-prose"
        />
      </div>
    </Card>
  );
}
