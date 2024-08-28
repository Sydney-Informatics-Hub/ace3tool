import { number_range } from "@/app/_utils/utils";
import { html, svg } from "htl";
import { interpolateMagma } from "d3-scale-chromatic";

type InterpolateFunction = (t: number) => string;

/**
 * Gradients in Observable Plot currently require some manual
 * creation using SVG gradients, see:
 * https://observablehq.com/@observablehq/plot-gradient-bars
 * Probably worth it as they should be more performant than
 * creating 100 rectangles manually
 * @param n number of offsets to create, increase this for a smoother gradient
 * @param gradient_id ID to use for the linearGradient element (reference this ID in plot marks)
 * @param scale scale interpolate function from d3, e.g. interpolateMagma
 * @param reverse reverse direction
 */
export const create_d3_gradient = (
  n: number,
  gradient_id: string = "gradient",
  scale: InterpolateFunction = interpolateMagma,
  reverse: boolean = false
) => {
  const width = 100 / n;
  const offsets = number_range(n + 1).map((x) => x * width);
  const stops = offsets.map(
    (x) =>
      svg.fragment`<stop offset=${x}% stop-color="${scale(
        (reverse ? 100 - x : x) / 100
      )}">`
  );
  return () => svg`<defs>
          <linearGradient id=${`${gradient_id}`}>
            ${stops}
          </linearGradient>
        </defs>`;
};

export const bold_title = (title: string) => {
  return html`<h2 class="font-semibold">${title}</h2>`;
};
