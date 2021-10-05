import { useGraphQLModules } from '@envelop/graphql-modules';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { getGraphQLParameters, processRequest } from 'graphql-helix';
import { createApplication } from 'graphql-modules';
import mercurius from 'mercurius';

import getEnvelopedPlugins from './plugins.envelop';
import ActionStarsModule from './modules/actionStars';
import HelloWorldModule from './modules/hello';

const graphqlApplication = createApplication({ modules: [
    HelloWorldModule,
    ActionStarsModule,
] });

const registerEnvelop = (application: FastifyInstance) => {
    const envelopReadyApplication = useGraphQLModules(graphqlApplication);
    const getEnveloped = getEnvelopedPlugins([ envelopReadyApplication ], application.appConfig.graphql.envelopPluginSettings);
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

const registerMercurius = (application: FastifyInstance) => {
    application.register(mercurius, {
        schema: graphqlApplication.createSchemaForApollo(),
    });
};

export default async (application: FastifyInstance) => {
    if (application.appConfig.graphql.useEnvelop) {
        registerEnvelop(application);
    } else {
        registerMercurius(application);
    }
};