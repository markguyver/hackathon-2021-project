# Hackathon 2021

This project is a playground for evaluating [Mercurius](https://mercurius.dev/) vs [GraphQL Helix](https://github.com/contrawork/graphql-helix#readme) (_with [Envelop](https://www.envelop.dev/)_) for performance (_both within [Fastify](https://www.fastify.io/)_) as well as learning about the benefits that the [Envelop](https://www.envelop.dev/) framework offers (_i.e. plugins_).

## To Use the Playground

1.  Start the database container with:
    ```
    docker-compose up -d database
    ```

1.  Update the database with the sample data:
    ```
    docker-compose up migrations
    ```
    ```
    docker-compose up seeder
    ```

1.  Start the API server:
    ```
    docker-compose up api
    ```

## Things to Note

There are a few things that can be changed about the API which are set via environment variables.

*   **[Mercurius](https://mercurius.dev/) vs [Envelop](https://www.envelop.dev/)**

    Inside the Docker Compose YAML file (_under the API service section_), you can find an environment variable called `APP_USE_ENVELOP`.  When this environment variable is set to `true`, the API will be started using [GraphQL Helix](https://github.com/contrawork/graphql-helix#readme) (_with [Envelop](https://www.envelop.dev/) as the GraphQL engine.  If this environment variable is set to "false", the API will be started using [Mercurius](https://mercurius.dev/) as the GraphQL engine.

*   **[Envelop](https://www.envelop.dev/) with [Parser Cache](https://www.envelop.dev/plugins/use-parser-cache) plugin**

    Inside the Docker Compose YAML file (_under the API service section_), you can find an environment variable called `CACHE_GRAPHQL_PARSE`. If you have the API configured to use [GraphQL Helix](https://github.com/contrawork/graphql-helix#readme) (_with [Envelop](https://www.envelop.dev/) and you set this environment variable to `true`, the GraphQL engine will use this plugin.

*   **[Envelop](https://www.envelop.dev/) with [Validation Cache](https://www.envelop.dev/plugins/use-validation-cache) plugin**

    Inside the Docker Compose YAML file (_under the API service section_), you can find an environment variable called `CACHE_GRAPHQL_VALIDATION`. If you have the API configured to use [GraphQL Helix](https://github.com/contrawork/graphql-helix#readme) (_with [Envelop](https://www.envelop.dev/) and you set this environment variable to `true`, the GraphQL engine will use this plugin.

*   **[Envelop](https://www.envelop.dev/) with [Response Cache](https://www.envelop.dev/plugins/use-response-cache) plugin**

    Inside the Docker Compose YAML file (_under the API service section_), you can find an environment variable called `CACHE_GRAPHQL_RESPONSE`. If you have the API configured to use [GraphQL Helix](https://github.com/contrawork/graphql-helix#readme) (_with [Envelop](https://www.envelop.dev/) and you set this environment variable to `true`, the GraphQL engine will use this plugin.