import { gql } from 'apollo-server-express';

export const userSchema = gql`
    extend type Query {
        me(email: String!): User
    }

    type User {
        id: ID
        email: String
    }
`;
