import {
  Conversation,
  ConversationParticipants,
  Message,
  PrismaClient,
} from "@prisma/client";
import { ApolloError } from "apollo-server-core";
import { GraphQLContext } from "../../../util/types";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    conversations: async function getConversations(
      _: any,
      args: Record<string, never>,
      context: GraphQLContext
    ): Promise<Array<ConversationFE>> {
      const { session } = context;

      if (!session?.user) {
        throw new ApolloError("Not authorized");
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
          include: {
            participants: true,
            latestMessage: true,
          },
        });

        return conversations;
      } catch (error: any) {
        console.log("error", error);
        throw new ApolloError(error?.message);
      }
    },
  },
};

interface ConversationFE extends Conversation {
  participants: ConversationParticipants[];
  latestMessage: Message;
}

export default resolvers;
