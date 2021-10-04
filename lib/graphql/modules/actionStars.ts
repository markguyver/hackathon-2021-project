import { gql, createModule } from 'graphql-modules';
import { ActionStar } from '../../models/actionStars';

export default createModule({
    id: 'ActionStars',
    dirname: __dirname,
    typeDefs: gql`
        extend type Query {
            actionStarById(id: ID!): ActionStar
            actionStarByRandom: ActionStar
        }

        type ActionStar {
            id: ID!
            name: String!
            dob: String
        }
    `,
    resolvers: {
        Query: {
            actionStarById: async (parent: undefined, args: { id: number; }) => {
                const retrievedStar = await ActionStar.findOne({
                    where: { id: args.id },
                });
                return retrievedStar ? retrievedStar.toJSON() : null;
            },
            actionStarByRandom: async () => {
                const retrievedStar = await ActionStar.findOne({
                    order: ActionStar.sequelize?.random(),
                });
                return retrievedStar ? retrievedStar.toJSON() : null;
            },
        },
    },
});