import { FastifyInstance } from 'fastify';
import buildApplication from "../lib";
import defaultApplicationConfig, { ApplicationConfig } from '../lib/config';

const filterSensitiveConfigFields = (config: ApplicationConfig): ApplicationConfig => {
    const filteredConfig = { ...config };
    filteredConfig.database.password = '[redacted]';
    return filteredConfig;
};

const createServer = async (start: boolean = false, config: ApplicationConfig = defaultApplicationConfig): Promise<FastifyInstance> => {
    const application = await buildApplication(config);
    if (start) {
        await application.listen(config.fastify.port, config.fastify.host);
        application.log.debug({ applicationConfig: filterSensitiveConfigFields(config) }, 'Application Configuration');
    }
    return application;
};

if (require.main === module) {
    process.on('unhandledRejection', err => {
        throw err;
    });
    createServer(true);
}

export default createServer();