import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import express from 'express'
import { createApp } from './app.ts'
import { ensureDatabase } from './seed.ts'

const databasePath = ensureDatabase()
const db = new DatabaseSync(databasePath, { readOnly: true })
const app = createApp(db)
const port = Number(process.env.PORT ?? 8788)
const distPath = resolve(process.cwd(), 'dist')

if (existsSync(distPath)) {
  app.use(express.static(distPath))
  app.get('*path', (_request, response) => {
    response.sendFile(resolve(distPath, 'index.html'))
  })
}

const server = app.listen(port, '127.0.0.1', () => {
  console.log(`India Mechanics API listening on http://127.0.0.1:${port}`)
})

const shutdown = () => {
  server.close(() => {
    db.close()
    process.exit(0)
  })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
