import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

export const app = new Hono()

app.use('*', logger())
app.use('*', cors())

app.get('/', (c) =>
  c.json({
    name: 'hobby',
    stack: 'Hono',
    routes: ['GET /', 'GET /health', 'POST /ping'],
  }),
)

app.get('/health', (c) => c.json({ status: 'ok' }))

app.post('/ping', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const name =
    typeof body === 'object' &&
    body !== null &&
    'name' in body &&
    typeof body.name === 'string' &&
    body.name.trim()
      ? body.name.trim()
      : 'hobby'

  return c.json({
    ok: true,
    message: `${name} is wired up`,
  })
})
