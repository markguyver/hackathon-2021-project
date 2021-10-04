import { gql, createModule } from 'graphql-modules';

export default createModule({
    id: 'ActionStars',
    dirname: __dirname,
    typeDefs: gql`
        extend type Query {
            actionStarById(id: ID!): ActionStar
            actionStarByRandom: ActionStar!
        }

        type ActionStar {
            id: ID!
            name: String!
            dob: String
        }
    `,
    resolvers: {
        Query: {
            actionStarById: (parent: undefined, args: { id: number; }) => ({
                id: args.id as number,
                name: 'Get By ID Placeholder',
            }),
            actionStarByRandom: () => ({
                id: -1,
                name: 'Random Placeholder',
            }),
        },
    },
});