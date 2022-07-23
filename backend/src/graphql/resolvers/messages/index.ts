import { Message } from "@prisma/client";
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
                username: true,
              },
            },
          },
        });

        console.log("HERE ARE MESSAGES", messages);

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
      const { session, pubsub, prisma } = context;

      if (!session?.user) {
        throw new ApolloError("Not authorized");
      }

      const { senderId, conversationId, body } = args;

      try {
        /**
         * Create new message entity
         */
        const newMessage = await prisma.message.create({
          data: {
            senderId,
            conversationId,
            body,
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
};

interface MessageFE extends Message {
  sender: {
    username: string;
  };
}

type SendMessageArguments = Pick<
  Message,
  "conversationId" | "senderId" | "body"
>;

export default resolvers;
