import { FastifyInstance } from 'fastify';

import { ApplicationConfig } from '../config';
import registerAltairPlugin from './altair';

export default (application: FastifyInstance, config: ApplicationConfig) => {
    registerAltairPlugin(application, config);
};