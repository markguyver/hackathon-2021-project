import { FastifyInstance, FastifyRequest, FastifyReply, RouteOptions } from 'fastify';
import { Sequelize } from 'sequelize';
import { container } from 'tsyringe';

type FunctionalStatus = 'alive' | 'dead';
type GraphQLEngine = 'Helix with Envelop' | 'Mercurius';
type PluginEnabled = 'on' | 'off';

interface HealthCheckPayload {
    status: FunctionalStatus;
    altair: PluginEnabled;
    graphqlEngine: GraphQLEngine;
    parserCache?: PluginEnabled;
    responseCache?: PluginEnabled;
    validationCache?: PluginEnabled;
    database?: FunctionalStatus;
}

const buildHealthCheckRoute = (application: FastifyInstance): RouteOptions => ({
    method: ['GET'],
    url: '/',
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
        const responsePayload: HealthCheckPayload = {
            status: 'alive',
            graphqlEngine: application.appConfig.graphql.useEnvelop ? 'Helix with Envelop' : 'Mercurius',
            altair: application.appConfig.graphql.useAltair ? 'on' : 'off',
        };
        if (application.appConfig.graphql.useEnvelop) {
            responsePayload.parserCache = application.appConfig.graphql.envelopPluginSettings.parserCache ? 'on' : 'off';
            responsePayload.responseCache = application.appConfig.graphql.envelopPluginSettings.responseCache ? 'on' : 'off';
            responsePayload.validationCache = application.appConfig.graphql.envelopPluginSettings.validationCache ? 'on' : 'off';
        }
        const sequelizeInstance = container.resolve(Sequelize);
        try {
            await sequelizeInstance.authenticate();
            responsePayload.database = 'alive';
        } catch (error) {
            responsePayload.database = 'dead';
        }
        reply.send(responsePayload)
    },
});

export default buildHealthCheckRoute;