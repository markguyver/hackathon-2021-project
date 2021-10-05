import { FastifyInstance } from 'fastify';

import BuildHealthCheckRoute from './health';
import DatabaseCacheResetRoute from './databaseCacheReset';

export default (application: FastifyInstance) => {
    application.route(BuildHealthCheckRoute(application));
    application.route(DatabaseCacheResetRoute);
};