import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.join(__dirname, "src/"),
            "@components": path.join(__dirname, "src/components/"),
            "@api": path.join(__dirname, "src/api/"),
            "@app": path.join(__dirname, "src/app/"),
        },
    },
});
