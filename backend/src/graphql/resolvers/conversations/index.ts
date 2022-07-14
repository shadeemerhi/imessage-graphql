import { Conversation, PrismaClient } from "@prisma/client";
import { GraphQLContext } from "../../../util/types";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    conversations: async function getConversations(
      _: any,
      args: Record<string, never>,
      context: GraphQLContext
    ): Promise<IConversationsResponse> {
      const { session } = context;

      if (!session?.user) {
        return {
          error: "Not authorized",
        };
      }

      try {
        const { id } = session.user;
        /**
         * Find all conversations that user is part of
         */
        const conversations = await prisma.conversation.findMany({
          where: {
            participants: {
              every: {
                userId: id,
              },
            },
          },
        });

        return { conversations };
      } catch (error: any) {
        return {
          error: error?.message as string,
        };
      }
    },
  },
};

interface IConversationsResponse {
  conversations?: Array<Conversation>;
  error?: string;
}

export default resolvers;
