import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('/api/*', cors())

app.get('/api/hello', (c) => {
  return c.json({
    message: 'DCG Simulator API Ready!',
  })
})

export default app