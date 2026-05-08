import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { Card } from '../shared/types';
import { albert } from './decks';

const app = new Hono()

app.use('/api/*', cors())

app.get('/api/hello', (c) => {
  return c.json({
    message: 'DCG Simulator API Ready!',
  })
})

app.get('/api/cards', (c) => {
  return c.json(albert)
})

export default app