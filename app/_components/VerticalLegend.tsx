import { ReactNode } from "react";
import { Table } from "flowbite-react";

interface LegendTableItem {
  icon: ReactNode;
  label: string;
}

/**
 * Create the plot legend as table, where each row has an icon (can be any
 * React element) and a label.
 * @param props list of LegendTableItems, in order
 */
export function LegendTable(props: { items: LegendTableItem[] }) {
  return (
    <Table className="table-auto">
      <Table.Body>
        {props.items.map((item, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell
                className={
                  "p-1 w-10 h-10 border-2 align-middle justify-center items-center text-center"
                }
              >
                {item.icon}
              </Table.Cell>
              <Table.Cell className="p-1 h-10 text-sm">{item.label}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
