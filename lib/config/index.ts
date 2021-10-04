import { FastifyServerOptions } from 'fastify';

interface FastifyConfiguration {
    host: string;
    port: number;
    options: FastifyServerOptions;
}

export interface GraphqlConfiguration {
    parserCache: boolean;
    responseCache: boolean;
    validationCache: boolean;
}

export interface ApplicationConfig {
    fastify: FastifyConfiguration;
    graphql: GraphqlConfiguration;
}

const defaultConfig: ApplicationConfig = {
    fastify: {
        host: process.env.APP_HOST || '0.0.0.0',
        port: parseInt(String(process.env.APP_PORT).toString()) || 3000,
        options: {
            logger: {
                level: process.env.LOG_LEVEL || 'info',
            },
        },
    },
    graphql: {
        parserCache: process.env.CACHE_GRAPHQL_PARSE === 'true',
        responseCache: process.env.CACHE_GRAPHQL_RESPONSE === 'true',
        validationCache: process.env.CACHE_GRAPHQL_VALIDATION === 'true',
    },
};

export default defaultConfig;