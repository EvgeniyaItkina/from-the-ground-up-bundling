import fastify from 'fastify';
import fastifyStatic from '@fastify/static';

const server = fastify();

server.register(fastifyStatic, {
  root: new URL('../public', import.meta.url),
});

await server.listen({port: 3000});
