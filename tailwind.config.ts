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
      width: {
        "100px": "100px",
        "150px": "150px",
        "200px": "200px",
        "300px": "300px",
        "400px": "400px",
        "500px": "500px",
        "600px": "600px",
        "700px": "700px",
        "800px": "800px",
      },
      height: {
        "100px": "100px",
        "150px": "150px",
        "200px": "200px",
        "250px": "250px",
        "300px": "300px",
        "400px": "400px",
        "450px": "450px",
        "500px": "500px",
        "600px": "600px",
        "700px": "700px",
        "800px": "800px",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
