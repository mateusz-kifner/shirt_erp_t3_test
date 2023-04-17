import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        pop: "pop  0.25s ease-out",
      },
      keyframes: {
        pop: {
          "0%": {
            transform: "scale( 0.95)",
          },
          "40%": {
            transform: "scale(1.02)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
  darkMode: "class",
} satisfies Config;
