import { ReactNode } from "react";
import { Button, CustomFlowbiteTheme, Popover } from "flowbite-react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import PlotTitle from "@/app/_components/PlotTitle";

const customButtonTheme: CustomFlowbiteTheme["button"] = {
  outline: {
    color: {
      indigo: "border-0",
    },
    on: "flex w-full justify-center bg-indigo-100 bg-opacity-80 text-indigo-900 transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit",
  },
};

interface PlotTitleWithTooltipProps {
  title: string;
  tooltip_content: ReactNode;
  button_content?: ReactNode;
  popover_id?: string;
  padding?: number;
}

export default function PlotTitleWithTooltip(props: PlotTitleWithTooltipProps) {
  const { title, tooltip_content } = props;
  const padding = props.padding !== undefined ? `p-${props.padding}` : "p-2";
  return (
    <div className="flex w-full items-center">
      <PlotTitle>{title}</PlotTitle>
      <Popover
        content={
          <div className={`w-96 ${padding} justify-center`}>
            {tooltip_content}
          </div>
        }
        trigger="hover"
        id={props.popover_id || undefined}
      >
        <Button
          className="ms-auto"
          size="sm"
          outline
          color="indigo"
          theme={customButtonTheme}
        >
          {props.button_content || (
            <QuestionMarkCircleIcon className="size-5" />
          )}
        </Button>
      </Popover>
    </div>
  );
}
