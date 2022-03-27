import { PrismaClient } from '@prisma/client';

declare global {
  var client: PrismaClient | undefined;
}

const client = new PrismaClient({
  log: [{ emit: 'event', level: 'query' }],
});

client.$on('query', (e) => {
  // Query Logging
  // console.log('Query: ' + e.query);
  // console.log('Params: ' + e.params);
  // console.log('Duration: ' + e.duration + 'ms');
});

if (process.env.NODE_ENV === 'development') {
  global.client = client;
}

export default client;
