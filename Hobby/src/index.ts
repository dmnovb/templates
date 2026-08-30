import { serve } from '@hono/node-server'

import { app } from './app.js'

const port = Number(process.env.PORT ?? 3000)
const hostname = process.env.HOST ?? '0.0.0.0'

const server = serve(
  {
    fetch: app.fetch,
    hostname,
    port,
  },
  (info) => {
    console.log(`Hobby is running on http://${info.address}:${info.port}`)
  },
)

function shutdown() {
  server.close((error) => {
    if (error) {
      console.error(error)
      process.exit(1)
    }
    process.exit(0)
  })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
