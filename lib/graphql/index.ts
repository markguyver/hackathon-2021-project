import { envelop, useLogger, useTiming } from '@envelop/core';
import { useGraphQLModules } from '@envelop/graphql-modules';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { getGraphQLParameters, processRequest } from 'graphql-helix';
import { createApplication } from 'graphql-modules';

import HelloWorldModule from './modules/hello';

const getEnveloped = envelop({ plugins: [
    useGraphQLModules(createApplication({ modules: [
        HelloWorldModule,
    ] })),
    useLogger(),
    useTiming(),
] });

const handler = async (request: FastifyRequest, reply: FastifyReply) => {
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
};

export default async (application: FastifyInstance) => {
    application.route({
        method: ['POST'],
        url: '/graphql',
        handler, 
    });
};