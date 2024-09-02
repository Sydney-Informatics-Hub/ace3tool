import { ReactNode } from "react";
import { Table } from "flowbite-react";

interface LegendItem {
  icon: ReactNode;
  label: string;
}

const legend_items: LegendItem[] = [
  {
    icon: <span className="text-orange-500 font-bold text-lg">······</span>,
    label: "2 SDs below the mean for control patients",
  },
  {
    icon: <span className="text-red-600 font-extrabold text-lg">- - -</span>,
    label: "100% specificity for detecting dementia in our sample",
  },
];

function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

export default function HorizontalLegend() {
  const groups = chunk(legend_items, 2);
  return (
    <Table className="table-auto">
      <Table.Body>
        {groups.map((group, index) => {
          return (
            <Table.Row key={index}>
              {group.map((item, item_index) => {
                return (
                  <div key={item_index}>
                    <Table.Cell
                      className={
                        "p-2 w-12 h-8 border-2 align-middle justify-center items-center text-center"
                      }
                    >
                      {item.icon}
                    </Table.Cell>
                    <Table.Cell className="p-2 h-8 text-sm">
                      {item.label}
                    </Table.Cell>
                  </div>
                );
              })}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
