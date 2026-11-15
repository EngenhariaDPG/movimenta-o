import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // GitHub Pages publica o projeto no caminho /movimenta-o/.
  base: "/movimenta-o/",
});
