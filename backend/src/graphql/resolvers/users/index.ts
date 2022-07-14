import { GraphQLContext } from "../../../util/types";
import { verifyAndCreateUsername } from "./helpers";

const resolvers = {
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

export default resolvers;
