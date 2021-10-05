import { FastifyServerOptions } from 'fastify';

interface FastifyConfiguration {
    host: string;
    port: number;
    options: FastifyServerOptions;
}

export interface envelopPluginSettings {
    parserCache: boolean;
    responseCache: boolean;
    validationCache: boolean;
}

interface GraphqlConfiguration {
    useAltair: boolean;
    useEnvelop: boolean;
    envelopPluginSettings: envelopPluginSettings;
}

interface DatabaseConfiguration {
    host: string;
    port: number;
    username: string;
    password: string;
    schema: string;
}

export interface ApplicationConfig {
    fastify: FastifyConfiguration;
    graphql: GraphqlConfiguration;
    database: DatabaseConfiguration;
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
        useAltair: process.env.APP_USE_ALTAIR === 'true',
        useEnvelop: process.env.APP_USE_ENVELOP === 'true',
        envelopPluginSettings: {
            parserCache: process.env.CACHE_GRAPHQL_PARSE === 'true',
            responseCache: process.env.CACHE_GRAPHQL_RESPONSE === 'true',
            validationCache: process.env.CACHE_GRAPHQL_VALIDATION === 'true',
        },
    },
    database: {
        host: process.env.DB_HOST!,
        port: parseInt(String(process.env.DB_PORT).toString()) || 3306,
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        schema: process.env.DB_SCHEMA!,
    },
};

export default defaultConfig;