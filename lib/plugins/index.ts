import { FastifyInstance } from 'fastify';

import registerAltairPlugin from './altair';

export default (application: FastifyInstance) => {
    registerAltairPlugin(application);
};