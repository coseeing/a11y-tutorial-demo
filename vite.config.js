import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	base: "/coseeing-a11y-tree-demo/",
	plugins: [react()],
});
