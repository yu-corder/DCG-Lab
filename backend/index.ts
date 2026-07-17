import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { Card } from '../shared/types';
import { albert } from './decks';
import { token } from './token';
import { myLeader } from './leader';
import { enemyLeader } from './leader';
import { allCrests } from './crest';

const app = new Hono()

app.use('/api/*', cors())

app.get('/api/hello', (c) => {
  return c.json({
    message: 'DCG Simulator API Ready!',
  })
})

app.get('/api/game-start', (c) => {
  const respons = {cards: albert, myLeader: myLeader, enemyLeader: enemyLeader, token: token, crest: allCrests};
  return c.json(respons);
})

export default app