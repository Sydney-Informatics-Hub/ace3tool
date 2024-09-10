import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        heading: ["var(--heading-font)"],
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
