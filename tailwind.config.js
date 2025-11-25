/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			teal: {
				100: "#718A92",
				200: "#566F79",
				300: "#3A5961",
				PRIMARY: "#1F4147",
				500: "#1A373E",
				600: "#152D34",
				700: "#10242A",
			},
		},
		extend: {},
	},
	plugins: [],
};
