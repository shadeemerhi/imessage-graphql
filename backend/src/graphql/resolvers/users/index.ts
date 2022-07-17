import { User } from "@prisma/client";
import { GraphQLContext } from "../../../util/types";
import { verifyAndCreateUsername } from "./helpers";

const resolvers = {
  Query: {
    searchUsers: async function searchUsers(
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<any> {
      const { username } = args;
      console.log("SEARCH USERNAME", username);

      return {
        users: [],
      };
    },
  },
  Mutation: {
    createUsername: async function createUsername(
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<ICreateUsernameResponse> {
      const { session } = context;
      console.log("at the api hehe");

      if (!session?.user) {
        return {
          error: "Not authorized",
        };
      }

      const { id } = session.user;
      const { username } = args;

      return await verifyAndCreateUsername(id, username);
    },
  },
};

export interface ICreateUsernameResponse {
  success?: boolean;
  error?: string;
}

export interface SearchUsersResponse {
  users: Array<User>;
}

export default resolvers;
