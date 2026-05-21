import { Elysia } from 'elysia'
import { node } from '@elysiajs/node'
import { memosRoute } from './modules/memo/index.js'

const app = new Elysia({ adapter: node() })
  .get('/', () => {
    return {
      message: 'Memo API is running'
    }
  })
  .use(memosRoute)
  .listen(3000)

console.log('Elysia server is running at http://localhost:3000')