import { ReactNode } from "react";
import { Button, Popover } from "flowbite-react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import PlotTitle from "@/app/_components/PlotTitle";

interface PlotTitleWithTooltipProps {
  title: string;
  tooltip_content: ReactNode;
  button_content?: ReactNode;
}

export default function PlotTitleWithTooltip(props: PlotTitleWithTooltipProps) {
  const { title, tooltip_content } = props;
  return (
    <div className="flex w-full items-center">
      <PlotTitle>{title}</PlotTitle>
      <Popover
        content={
          <div className="w-96 p-2 justify-center">{tooltip_content}</div>
        }
        trigger="hover"
      >
        <Button className="ms-auto" size="sm" outline gradientMonochrome="info">
          {props.button_content || (
            <QuestionMarkCircleIcon className="size-5" />
          )}
        </Button>
      </Popover>
    </div>
  );
}
