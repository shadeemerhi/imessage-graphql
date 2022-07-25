import { User } from "@prisma/client";
import { ApolloError } from "apollo-server-core";
import { verifyAndCreateUsername } from "../../util/dbHelpers";
import { CreateUsernameResponse, GraphQLContext } from "../../util/types";

const resolvers = {
  Query: {
    searchUsers: async function searchUsers(
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<Array<User>> {
      const { username } = args;
      const { prisma } = context;

      try {
        const users = await prisma.user.findMany({
          where: {
            username,
          },
        });

        return users;
      } catch (error: any) {
        console.log("error", error);
        throw new ApolloError(error?.message);
      }
    },
  },
  Mutation: {
    createUsername: async function createUsername(
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<CreateUsernameResponse> {
      const { session } = context;

      if (!session?.user) {
        return {
          error: "Not authorized",
        };
      }

      const { id } = session.user;
      const { username } = args;

      return await verifyAndCreateUsername(
        { userId: id, username },
        context.prisma
      );
    },
  },
};

export default resolvers;
