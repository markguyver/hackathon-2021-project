import fastify, { FastifyInstance } from 'fastify';
import { ApplicationConfig } from './config';

const buildApplication = async (config: ApplicationConfig): Promise<FastifyInstance> => {
    const application = fastify(config.fastify.options);
    return application;
};

export default buildApplication;