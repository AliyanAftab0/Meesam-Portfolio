import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: {
          DEFAULT: "var(--accent)",
          muted: "var(--accent-muted)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          hover: "var(--surface-hover)",
        },
        border: "var(--border)",
        text: {
          secondary: "var(--text-secondary)",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      transitionTimingFunction: {
        smooth: "var(--transition-smooth)",
        slow: "var(--transition-slow)",
      },
      backgroundImage: {
        'dust-gradient': "linear-gradient(90deg, rgba(255,255,255,1) 0%, var(--accent) 30%, rgba(255,255,255,0.8) 50%, var(--accent) 70%, rgba(255,255,255,1) 100%)",
      },
      keyframes: {
        "flowing-dust": {
          "to": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        "flowing-dust": "flowing-dust 5s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
