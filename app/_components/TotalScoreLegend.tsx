import { ReactNode } from "react";
import AreaIcon from "@/app/_components/AreaIcon";
import { Table } from "flowbite-react";

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
        className="inline text-yellow-200 opacity-50 fill-current stroke-black stroke-2"
      />
    ),
  },
  {
    icon: (
      <AreaIcon
        height={32}
        width={32}
        className="inline text-yellow-200 fill-current stroke-black stroke-2 rotate-180"
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
                  "p-2 w-12 h-10 border-2 align-middle justify-center items-center text-center"
                }
              >
                {item.icon}
              </Table.Cell>
              <Table.Cell className="p-2 h-10 text-sm">{item.label}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}

export default function TotalScoreLegend() {
  return (
    <>
      <h3 className="text-base text-indigo-600 font-bold mt-2">Legend</h3>
      <LegendTable items={legend_items} />
    </>
  );
}
