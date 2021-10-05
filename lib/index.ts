import 'reflect-metadata';
import fastify, { FastifyInstance } from 'fastify';

import { ApplicationConfig } from './config';
import registerGraphql from './graphql';
import registerDatabaseModels from './models';
import registerPlugins from './plugins';
import registerRestfulRoutes from './routes';

declare module 'fastify' {
    interface FastifyInstance {
        appConfig: ApplicationConfig;
    }
}

const buildApplication = async (config: ApplicationConfig): Promise<FastifyInstance> => {
    const application = fastify(config.fastify.options);
    application.decorate('appConfig', config);

    registerDatabaseModels(application);
    await registerGraphql(application);
    registerPlugins(application);
    registerRestfulRoutes(application);

    return application;
};

export default buildApplication;