import fastify, { FastifyInstance } from 'fastify';
import { ApplicationConfig } from './config';
import registerGraphql from './graphql';
import registerRestfulRouts from './routes';

const buildApplication = async (config: ApplicationConfig): Promise<FastifyInstance> => {
    const application = fastify(config.fastify.options);
    await registerGraphql(application);
    registerGraphql(application);
    return application;
};

export default buildApplication;