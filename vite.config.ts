import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/* One HTML entry per page, so each section is a real URL a static host
   serves without rewrites: /, /venue/, /dining/, /gallery/, /enquire/ */
const page = (p: string) => resolve(__dirname, p, 'index.html')

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        venue: page('venue'),
        dining: page('dining'),
        gallery: page('gallery'),
        enquire: page('enquire'),
      },
    },
  },
})
