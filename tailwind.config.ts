import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		fontMetrics: {
			sans: {
				capHeight: 1490,
				ascent: 1984,
				descent: -494,
				lineGap: 0,
				unitsPerEm: 2048,
			},
		},
		colors: {
			black: "#141414", // alias of gray-950
			white: "#f6f6f6", // alias of gray-50
			red: "#ff4133",
			gray: {
				50: "#E8E8E8",
				100: "#DBDBDB",
				200: "#C4C4C4",
				300: "#ADADAD",
				400: "#969696",
				500: "#7D7D7D",
				600: "#666666",
				700: "#4F4F4F",
				800: "#383838",
				900: "#1F1F1F",
				950: "#141414",
			},
			green: {
				50: "#EAFFE0",
				100: "#D5FFC2",
				200: "#A8FF80",
				300: "#7EFF42",
				400: "#51FF00",
				500: "#47E000",
				600: "#3DC200",
				700: "#35A800",
				800: "#2C8A00",
				900: "#226B00",
				950: "#1D5C00",
			},
		},
		extend: {
			transitionProperty: {
				colors: "background-color, border-color, color, fill, stroke",
			},
		},
	},
	plugins: [require("tailwindcss-capsize")],
};
export default config;
