import { FastifyInstance } from 'fastify';

import HealthCheckRoute from './health';

export default (application: FastifyInstance) => {
    application.route(HealthCheckRoute);
};