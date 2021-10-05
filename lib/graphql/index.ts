import { useGraphQLModules } from '@envelop/graphql-modules';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { getGraphQLParameters, processRequest } from 'graphql-helix';
import { createApplication } from 'graphql-modules';
import mercurius from 'mercurius';

import { ApplicationConfig } from '../config';
import getEnvelopedPlugins from './plugins.envelop';
import ActionStarsModule from './modules/actionStars';
import HelloWorldModule from './modules/hello';

const graphqlApplication = createApplication({ modules: [
    HelloWorldModule,
    ActionStarsModule,
] });

const registerEnvelop = (application: FastifyInstance, config: ApplicationConfig) => {
    const envelopReadyApplication = useGraphQLModules(graphqlApplication);
    const getEnveloped = getEnvelopedPlugins([ envelopReadyApplication ], config.graphql.envelopPluginSettings);
    application.route({
        method: ['POST'],
        url: '/graphql',
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const { parse, validate, contextFactory, execute, schema } = getEnveloped({ request });
            const { operationName, query, variables } = getGraphQLParameters(request);
            const result = await processRequest({
                operationName,
                query,
                variables,
                request,
                schema,
                parse,
                validate,
                execute,
                contextFactory,
            });
            if (result.type === 'RESPONSE') {
                reply.status(result.status);
                reply.send(result.payload);
            } else {
                reply.send({ errors: [{ message: 'Not Supported' }] });
            }
        }, 
    });
};

const registerMercurius = (application: FastifyInstance, config: ApplicationConfig) => {
    application.register(mercurius, {
        schema: graphqlApplication.createSchemaForApollo(),
    });
};

export default async (application: FastifyInstance, config: ApplicationConfig) => {
    if (config.graphql.useEnvelop) {
        registerEnvelop(application, config);
    } else {
        registerMercurius(application, config);
    }
};