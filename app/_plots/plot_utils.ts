import { number_range } from "@/app/_utils/utils";
import { svg } from "htl";
import { interpolateMagma } from "d3-scale-chromatic";

/**
 * Gradients in Observable Plot currently require some manual
 * creation using SVG gradients, see:
 * https://observablehq.com/@observablehq/plot-gradient-bars
 * Probably worth it as they should be more performant than
 * creating 100 rectangles manually
 * @param n number of offsets to create, increase this for a smoother gradient
 * @param gradient_id ID to use for the linearGradient element (reference this ID in plot marks)
 * @param scale scale interpolate function from d3, e.g. interpolateMagma
 */
export const create_d3_gradient = (
  n: number,
  gradient_id: string = "gradient",
  scale: (t: number) => string = interpolateMagma
) => {
  const width = 100 / n;
  const offsets = number_range(n + 1).map((x) => x * width);
  const stops = offsets.map(
    (x) => svg.fragment`<stop offset=${x}% stop-color="${scale(x / 100)}">`
  );
  return () => svg`<defs>
          <linearGradient id=${`${gradient_id}`}>
            ${stops}
          </linearGradient>
        </defs>`;
};
