import { FastifyRequest, FastifyReply, RouteOptions } from 'fastify';
import { Sequelize } from 'sequelize';
import { container } from 'tsyringe';

const databaseCacheResetRoute: RouteOptions = {
    method: ['GET'],
    url: '/reset',
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const sequelizeInstance = container.resolve(Sequelize);
            await sequelizeInstance.query('RESET QUERY CACHE;');
            reply.send({ message: 'Query cache reset' });
        } catch (error) {
            reply.status(500).send();
        }
    },
}

export default databaseCacheResetRoute;