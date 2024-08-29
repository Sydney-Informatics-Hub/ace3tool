import { ReactNode } from "react";
import { Button, Popover } from "flowbite-react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

interface PlotTitleWithTooltipProps {
  title: string;
  tooltip_content: ReactNode;
  button_content?: ReactNode;
}

export default function PlotTitleWithTooltip(props: PlotTitleWithTooltipProps) {
  const { title, tooltip_content } = props;
  return (
    <div className="flex w-full items-center">
      <h2 className="font-semibold text-indigo-600">{title}</h2>
      <Popover
        content={
          <div className="w-96 p-2 justify-center">{tooltip_content}</div>
        }
        trigger="hover"
      >
        <Button className="ms-auto" color="blue" outline>
          {props.button_content || (
            <QuestionMarkCircleIcon className="size-5" />
          )}
        </Button>
      </Popover>
    </div>
  );
}
