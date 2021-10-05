import 'reflect-metadata';
import fastify, { FastifyInstance } from 'fastify';
import { ApplicationConfig } from './config';
import registerGraphql from './graphql';
import registerDatabaseModels from './models';
import registerRestfulRoutes from './routes';

const buildApplication = async (config: ApplicationConfig): Promise<FastifyInstance> => {
    const application = fastify(config.fastify.options);
    await registerGraphql(application, config);
    registerDatabaseModels(application, config);
    registerRestfulRoutes(application);
    return application;
};

export default buildApplication;