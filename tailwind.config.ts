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
			black: "#141414",
			white: "#f8f9fa",
			red: "#ff4133",
			green: "#51ff00",
		},
	},
	plugins: [require("tailwindcss-capsize")],
};
export default config;
