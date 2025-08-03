import type { FastifyInstance } from 'fastify';

interface Quote {
  id: string;
  content: string;
  author: string;
}

const quotes: Quote[] = [
  {
    id: 'q1',
    content: 'Do not wait for opportunity. Create it.',
    author: 'George Bernard Shaw',
  },
  {
    id: 'q2',
    content: 'Success is not in what you have, but who you are.',
    author: 'Bo Bennett',
  },
  {
    id: 'q3',
    content: 'The harder you work for something, the greater you’ll feel when you achieve it.',
    author: 'Unknown',
  },
  {
    id: 'q4',
    content: 'Dream bigger. Do bigger.',
    author: 'Unknown',
  },
  {
    id: 'q5',
    content: 'Don’t stop when you’re tired. Stop when you’re done.',
    author: 'Wesley Snipes',
  },
  {
    id: 'q6',
    content: 'Wake up with determination. Go to bed with satisfaction.',
    author: 'George Lorimer',
  },
  {
    id: 'q7',
    content: 'Push yourself, because no one else is going to do it for you.',
    author: 'Les Brown',
  },
  {
    id: 'q8',
    content: 'Success doesn’t just find you. You have to go out and get it.',
    author: 'Marva Collins',
  },
  {
    id: 'q9',
    content: 'The key to success is to focus on goals, not obstacles.',
    author: 'Unknown',
  },
  {
    id: 'q10',
    content: 'Believe in yourself, take on your challenges, dig deep within yourself to conquer fears.',
    author: 'Chantal Sutherland',
  },
];


async function quoteRoutes(server: FastifyInstance) {
  server.get('/', async () => quotes);

  server.post('/', async (request, reply) => {
    const { content, author } = request.body as Omit<Quote, 'id'>;
    const newQuote = { id: `q${quotes.length + 1}`, content, author };
    quotes.push(newQuote);
    return newQuote;
  });

  server.delete('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const index = quotes.findIndex((q) => q.id === id);
    if (index !== -1) {
      quotes.splice(index, 1);
      return { message: 'Quote deleted' };
    } else {
      reply.code(404).send({ error: 'Quote not found' });
    }
  });
}

export default quoteRoutes;
