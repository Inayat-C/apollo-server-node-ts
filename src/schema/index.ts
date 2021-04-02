import { gql } from 'apollo-server-express';

// Schemas
import { userSchema } from './userSchema';

const baseSchema = gql`
    type Query {
        _: Boolean
    }
`;

export const typeDefs = [baseSchema, userSchema];
