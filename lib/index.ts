import fastify, { FastifyInstance } from 'fastify';
import { ApplicationConfig } from './config';
import registerGraphql from './graphql';

const buildApplication = async (config: ApplicationConfig): Promise<FastifyInstance> => {
    const application = fastify(config.fastify.options);
    await registerGraphql(application);
    return application;
};

export default buildApplication;