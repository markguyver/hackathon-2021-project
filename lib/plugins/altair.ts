import { FastifyInstance } from 'fastify';
import AltairFastify from 'altair-fastify-plugin';

import { ApplicationConfig } from '../config';

export default (application: FastifyInstance, config: ApplicationConfig) => {
    if (config.graphql.useAltair) {
        application.register(AltairFastify, {
            path: '/altair',
            baseURL: '/altair/',
            endpointURL: '/graphql',
        });
    }
};