import { FastifyServerOptions } from 'fastify';

export interface ApplicationConfig {
    fastify: {
        host: string;
        port: number;
        options: FastifyServerOptions;
    }
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
    }
};

export default defaultConfig;