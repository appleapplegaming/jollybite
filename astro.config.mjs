// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss(), cloudflare()],
  },
});
