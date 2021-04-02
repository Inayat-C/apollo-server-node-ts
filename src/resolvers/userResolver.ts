import { Resolvers, User } from '../generated/graphql';

export const userResolver: Resolvers = {
    Query: {
        me: async (_, { email }, context): Promise<User> => {
            const user = await context.prisma.user.findUnique({
                where: {
                    email,
                },
            });

            return {
                email: user?.email,
            };
        },
    },
};
