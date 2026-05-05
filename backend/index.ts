import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { Card } from '../shared/types';

const app = new Hono()

app.use('/api/*', cors())

app.get('/api/hello', (c) => {
  return c.json({
    message: 'DCG Simulator API Ready!',
  })
})

app.get('/api/cards', (c) => {
  const albert: Card[] = [
    {
      id: 'c1',
      name: '雷神',
      cost: 3,
      type: 'Follower',
      attack: 3,
      defense: 5,
      abilities: [
        {trigger: 'Fanfare', description: '疾走', effectType: 'Damage'}
      ],
      hasAttacked: false
    },
    {
      id: 'c2',
      name: 'オーディン',
      cost: 7,
      type: 'Follower',
      attack: 3,
      defense: 5,
      abilities: [
        {trigger: 'Fanfare', description: '疾走', effectType: 'Damage'}
      ],
      hasAttacked: false
    },
  ]
  return c.json(albert)
})

export default app