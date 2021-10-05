import { FastifyInstance } from 'fastify';
import AltairFastify from 'altair-fastify-plugin';

export default (application: FastifyInstance) => {
    if (application.appConfig.graphql.useAltair) {
        application.register(AltairFastify, {
            path: '/altair',
            baseURL: '/altair/',
            endpointURL: '/graphql',
        });
    }
};