import Fastify from 'fastify';
import cors from '@fastify/cors';
import quoteRoutes from './routes/quotes';

const server = Fastify({ logger: true });

async function start() {
  try {
    await server.register(cors, {
      origin: ['http://localhost:3000', 'http://localhost:5173'],
      methods: ['GET', 'POST', 'DELETE'],
    });

    server.register(quoteRoutes, { prefix: '/api/quotes' });

    await server.listen({ port: 4000, host: '0.0.0.0' });
    console.log('Server running at http://localhost:4000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
