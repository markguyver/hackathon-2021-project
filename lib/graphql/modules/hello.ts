import { gql, createModule } from 'graphql-modules';

export default createModule({
    id: 'HelloWorld',
    dirname: __dirname,
    typeDefs: gql`
        type Query {
            hello: String!
        }
    `,
    resolvers: {
        Query: {
            hello: () => 'World',
        },
    },
});