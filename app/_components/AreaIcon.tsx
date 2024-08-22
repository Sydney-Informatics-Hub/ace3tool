import { SVGProps } from "react";

/**
 * Simple SVG icon to demonstrate the area plots we use in NormPlot.
 * Apparently when using SVG in Tailwind, it can be best to just
 * include the SVG code directly, to allow easy control of colours
 * via Tailwind classes
 */
const AreaIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      viewBox="0 0 48 48"
      role="img"
    >
      <path d="M20.808 12.847.057 48.788h26.296l-.091.113h34.013L43.267 28.093l-8.003 9.793Z" />
    </svg>
  );
};
export default AreaIcon;
