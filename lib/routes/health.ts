import { FastifyRequest, FastifyReply, RouteOptions } from 'fastify';

const healthCheckRoute: RouteOptions = {
    method: ['GET'],
    url: '/',
    handler: async (request: FastifyRequest, reply: FastifyReply) => reply.send({ status: 'alive' }),
}

export default healthCheckRoute;