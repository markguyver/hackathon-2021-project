import { FastifyInstance } from 'fastify';

import HealthCheckRoute from './health';
import DatabaseCacheResetRoute from './databaseCacheReset';

export default (application: FastifyInstance) => {
    application.route(HealthCheckRoute);
    application.route(DatabaseCacheResetRoute);
};