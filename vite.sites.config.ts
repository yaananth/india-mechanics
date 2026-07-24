import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    ssr: 'hosting/worker.ts',
    outDir: 'dist/server',
    emptyOutDir: false,
    target: 'es2022',
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
        format: 'es',
      },
    },
  },
})
