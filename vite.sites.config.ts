import { readdir, readFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'

const virtualModuleId = 'virtual:sites-assets'
const resolvedVirtualModuleId = `\0${virtualModuleId}`

const contentTypes: Record<string, string> = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
}

function sitesAssets(): Plugin {
  return {
    name: 'sites-embedded-assets',
    resolveId(id) {
      return id === virtualModuleId ? resolvedVirtualModuleId : null
    },
    async load(id) {
      if (id !== resolvedVirtualModuleId) return null

      const snapshot = await readFile('dist/api-snapshot.json', 'utf8')
      const files = [
        'index.html',
        'llms.txt',
        'robots.txt',
        'sitemap.xml',
        'favicon.svg',
        ...(await readdir('dist/assets')).map((file) => `assets/${file}`),
      ]
      const assets = Object.fromEntries(
        await Promise.all(
          files.map(async (file) => [
            `/${file}`,
            {
              body: await readFile(join('dist', file), 'utf8'),
              contentType:
                contentTypes[extname(file)] ?? 'application/octet-stream',
            },
          ]),
        ),
      )

      return [
        `export const snapshot = JSON.parse(${JSON.stringify(snapshot)});`,
        `export const assets = ${JSON.stringify(assets)};`,
      ].join('\n')
    },
  }
}

export default defineConfig({
  plugins: [sitesAssets()],
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
