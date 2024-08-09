import {
  AceScaleInfo,
  AceScales,
  AceScaleScores,
} from "@/app/_forms/schemas/ace";
import { LogisticModel } from "@/lib/logistic";
import { List } from "flowbite-react";
import { useValidatedScores } from "@/app/_hooks/useValidatedScores";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { ArrowDownIcon } from "@heroicons/react/24/solid";

interface RiskElementsProps {
  scores: Partial<AceScaleScores>;
  model: LogisticModel<keyof AceScaleScores>;
}

export default function RiskElements(props: RiskElementsProps) {
  const { model } = props;
  const { scores } = useValidatedScores(props.scores);
  const risk_items = scores
    ? AceScales.map((scale) => {
        return {
          label: AceScaleInfo[scale].label,
          risk_increased: scores![scale] < model.predictor_means![scale],
        };
      })
    : undefined;
  const show = risk_items !== undefined;
  return (
    <>
      <h2
        className={`text-lg font-bold text-indigo-600 ${
          show ? "" : "invisible"
        }`}
      >
        Factors contributing to predicted risk
      </h2>
      <List unstyled>
        {risk_items &&
          risk_items.map((item) => {
            const colour = item.risk_increased
              ? "text-red-500"
              : "text-green-500";
            const direction = item.risk_increased ? "below" : "above";
            const CurrentIcon = item.risk_increased
              ? ArrowUpIcon
              : ArrowDownIcon;
            return (
              <List.Item key={item.label} className={colour}>
                <CurrentIcon className="inline size-5" /> {item.label} score is{" "}
                {direction} the sample mean
              </List.Item>
            );
          })}
        {/* Placeholder to maintain space for the items*/}
        {risk_items === undefined &&
          AceScales.map((scale) => (
            <List.Item key={scale} className="invisible">
              {scale}
            </List.Item>
          ))}
      </List>
    </>
  );
}
