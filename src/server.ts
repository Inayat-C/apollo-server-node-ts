import { app } from './app';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { PrismaClient } from '@prisma/client';

const main = async () => {
    const prisma = new PrismaClient();

    try {
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            context: () => {
                return {
                    prisma,
                };
            },
        });
        server.applyMiddleware({ app });

        // Start our server
        app.listen(process.env.PORT, () => {
            console.log('server started on http://localhost:5000/graphql');
        });
    } catch (err) {
        console.error(err);
    }
};
main();
