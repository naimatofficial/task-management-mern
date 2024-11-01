/* eslint-disable no-undef */
import withMT from "@material-tailwind/react/utils/withMT";

const { colors: defaultColors } = require("tailwindcss/defaultTheme");

// primary: {
// 			700: "#60792a",
// 			600: "#708e31",
// 			500: "#a1cb46",
// 			400: "#90b63f",
// 			300: "#c6e198",
// 			200: "#e2f0cc",
// 			100: "#e2efc7",
// 		}
const colors = {
	...defaultColors,
	...{
		// primary: {
		//     700: '#10430D', // Darker shade of #1D6713
		//     600: '#165310', // Slightly darker shade
		//     500: '#1D6713', // Main color
		//     400: '#25851B', // Lighter shade
		//     300: '#36A92C', // Even lighter
		//     200: '#8DDA87', // Lighter, softer tone
		//     100: '#C2EEC3', // Lightest shade
		// },

		primary: {
			50: "#e6f7ed",
			100: "#ccefdc",
			200: "#99dfb9",
			300: "#66cf97",
			400: "#009444", // main color
			500: "#00843e",
			600: "#007338",
			700: "#006332",
			800: "#00532c",
			900: "#004326",
		},
	},
};

export default withMT({
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
		"./node_modules/react-phone-input-2/lib/style.css",
	],
	theme: {
		extend: {
			// fontFamily: {
			// 	sans: ["Roboto", "ui-sans-serif", "system-ui"],
			// },
		},
		colors: colors,
	},

	plugins: [],
});
