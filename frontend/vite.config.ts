import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { componentTagger } from "lovable-tagger";

// https://vite.dev/config/
export default defineConfig(({mode}) => ({
  plugins: [react(), tailwindcss(), mode === "development" && componentTagger()].filter(Boolean)
}));
