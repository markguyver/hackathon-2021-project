import fastify, { FastifyInstance } from 'fastify';
import { ApplicationConfig } from './config';
import registerGraphql from './graphql';
import registerRestfulRoutes from './routes';

const buildApplication = async (config: ApplicationConfig): Promise<FastifyInstance> => {
    const application = fastify(config.fastify.options);
    await registerGraphql(application);
    registerRestfulRoutes(application);
    return application;
};

export default buildApplication;