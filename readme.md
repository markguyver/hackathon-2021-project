# Hackathon 2021

This project is a playground for evaluating [Mercurius](https://mercurius.dev/) vs [GraphQL Helix](https://github.com/contrawork/graphql-helix#readme) (_with [Envelop](https://www.envelop.dev/)_) for performance (_both within [Fastify](https://www.fastify.io/)_) as well as learning about the benefits that the [Envelop](https://www.envelop.dev/) framework offers (_i.e. plugins_).

## To Run the Playground

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

## To Use the Playground

Once you have the database and API containers running, there are 3 endpoints you can query with your tool of choice (_i.e. [Insomnia](https://insomnia.rest/), [Postman](https://www.postman.com/), [Altair](https://altair.sirmuel.design/), etc._):

*   **Health Check** (_RESTful_): Basic health-check endpoint that responds if the server is alive.

    ```
    GET http://localhost:3000/
    ```

*   **Database Query Cache Reset** (_RESTful_): An endpoint for clearing the query cache in the database (_to be run before performing Gatling benchmarking_).

    ```
    GET http://localhost:3000/reset
    ```

*   **GraphQL** (_GraphQL_): The endpoint powered by the different GraphQL engines this playground is exploring.

    ```
    POST http://localhost:3000/graphql
    ```

## Things to Note

There are a few things that can be changed about the API which are set via environment variables.

*   **[Mercurius](https://mercurius.dev/) vs [Envelop](https://www.envelop.dev/)**

    Inside the Docker Compose YAML file (_under the API service section_), you can find an environment variable called `APP_USE_ENVELOP`.  When this environment variable is set to `true`, the API will be started using [GraphQL Helix](https://github.com/contrawork/graphql-helix#readme) (_with [Envelop](https://www.envelop.dev/)_) as the GraphQL engine.  If this environment variable is set to `false`, the API will be started using [Mercurius](https://mercurius.dev/) as the GraphQL engine.

*   **[Envelop](https://www.envelop.dev/) with [Parser Cache](https://www.envelop.dev/plugins/use-parser-cache) plugin**

    Inside the Docker Compose YAML file (_under the API service section_), you can find an environment variable called `CACHE_GRAPHQL_PARSE`. If you have the API configured to use [GraphQL Helix](https://github.com/contrawork/graphql-helix#readme) (_with [Envelop](https://www.envelop.dev/)_) and you set this environment variable to `true`, the GraphQL engine will use this plugin.

*   **[Envelop](https://www.envelop.dev/) with [Validation Cache](https://www.envelop.dev/plugins/use-validation-cache) plugin**

    Inside the Docker Compose YAML file (_under the API service section_), you can find an environment variable called `CACHE_GRAPHQL_VALIDATION`. If you have the API configured to use [GraphQL Helix](https://github.com/contrawork/graphql-helix#readme) (_with [Envelop](https://www.envelop.dev/)_) and you set this environment variable to `true`, the GraphQL engine will use this plugin.

*   **[Envelop](https://www.envelop.dev/) with [Response Cache](https://www.envelop.dev/plugins/use-response-cache) plugin**

    Inside the Docker Compose YAML file (_under the API service section_), you can find an environment variable called `CACHE_GRAPHQL_RESPONSE`. If you have the API configured to use [GraphQL Helix](https://github.com/contrawork/graphql-helix#readme) (_with [Envelop](https://www.envelop.dev/)_) and you set this environment variable to `true`, the GraphQL engine will use this plugin.