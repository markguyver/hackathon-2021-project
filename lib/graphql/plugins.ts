import { envelop, useLogger, useTiming, Plugin } from '@envelop/core';
import { useParserCache } from '@envelop/parser-cache';
import { useResponseCache } from '@envelop/response-cache';
import { useValidationCache } from '@envelop/validation-cache';

import { GraphqlConfiguration } from '../config';

const getEnvelopPluginsList = (plugins: Plugin[], config: GraphqlConfiguration): Plugin[] => {
    plugins.push( useLogger() );
    plugins.push( useTiming() );
    if (config.parserCache) {
        plugins.push( useParserCache() );
    }
    if (config.responseCache) {
        plugins.push( useResponseCache() );
    }
    if (config.validationCache) {
        plugins.push( useValidationCache() );
    }
    return plugins;
};

const getEnvelopedPlugins = (plugins: Plugin[], config: GraphqlConfiguration) => envelop({
    plugins: getEnvelopPluginsList(plugins, config),
});

export default getEnvelopedPlugins;