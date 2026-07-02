import { Server, defineRoutes, serve } from 'vafast'

const routes = defineRoutes([
  {
    method: 'GET',
    path: '/',
    handler: () => 'Hello Vafast!',
  },
  {
    method: 'GET',
    path: '/health',
    handler: () => ({ status: 'ok', timestamp: Date.now() }),
  },
])

const server = new Server(routes)

serve({ fetch: server.fetch, port: 3000 }, () => {
  console.log('🚀 Server running on http://localhost:3000')
})
