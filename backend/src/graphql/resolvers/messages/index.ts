import { ApolloError } from "apollo-server-core";
import { GraphQLContext } from "../../../util/types";

const resolvers = {
  Query: {
    messages: async function (
      _: any,
      args: { conversationId: string },
      context: GraphQLContext
    ): Promise<Array<MessageFE>> {
      const { session, prisma } = context;
      const { conversationId } = args;

      if (!session?.user) {
        throw new ApolloError("Not authorized");
      }

      try {
        const messages = await prisma.message.findMany({
          where: {
            conversationId,
          },
          include: {
            sender: {
              select: {
                id: true,
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return messages;
      } catch (error: any) {
        console.log("messages error", error);
        throw new ApolloError(error?.message);
      }
    },
  },
  Mutation: {
    sendMessage: async function (
      _: any,
      args: SendMessageArguments,
      context: GraphQLContext
    ): Promise<boolean> {
      const { session, prisma, pubsub } = context;

      if (!session?.user) {
        throw new ApolloError("Not authorized");
      }

      const { id, senderId, conversationId, body } = args;

      try {
        /**
         * Create new message entity
         */
        const newMessage = await prisma.message.create({
          data: {
            id,
            senderId,
            conversationId,
            body,
          },
          include: {
            sender: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        });

        /**
         * Update conversation latestMessageId
         */
        await prisma.conversation.update({
          where: {
            id: conversationId,
          },
          data: {
            latestMessageId: newMessage.id,
          },
        });

        pubsub.publish("MESSAGE_SENT", { messageSent: newMessage });

        return true;
      } catch (error) {
        console.log("sendMessage error", error);
        throw new ApolloError("Error sending message");
      }
    },
  },
  Subscription: {
    messageSent: {
      subscribe: (_: any, __: any, context: GraphQLContext) => {
        const { pubsub } = context;
        return pubsub.asyncIterator(["MESSAGE_SENT"]);
      },
    },
  },
};

interface MessageFE {
  id: string;
  body: string;
  sender: {
    id: string;
    username: string;
  };
  createdAt: Date;
}

interface SendMessageArguments {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
}

export default resolvers;
