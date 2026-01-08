import { Server, createHandler, serve } from 'vafast'

const server = new Server([
  {
    method: 'GET',
    path: '/',
    handler: createHandler(() => 'Hello Vafast!')
  },
  {
    method: 'GET',
    path: '/health',
    handler: createHandler(() => ({ status: 'ok', timestamp: Date.now() }))
  }
])

serve({ fetch: server.fetch, port: 3000 }, () => {
  console.log('🚀 Server running on http://localhost:3000')
})
