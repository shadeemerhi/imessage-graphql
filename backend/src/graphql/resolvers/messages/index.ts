import { Message } from "@prisma/client";
import { ApolloError } from "apollo-server-core";
import { GraphQLContext } from "../../../util/types";

const resolvers = {
  Mutation: {
    sendMessage: async function (
      _: any,
      args: SendMessageArguments,
      context: GraphQLContext
    ) {
      const { session, pubsub, prisma } = context;

      if (!session?.user) {
        throw new ApolloError("Not authorized");
      }

      const { conversationId, senderId, body } = args;

      /**
       * @todo
       * Create message entity using conversationId
       */

      /**
       * @todo
       * Update conversations latestMessageId using
       * conversationId and messageId from above
       */

      /**
       * @todo
       * Publish MESSAGE_SENT event
       */
    },
  },
};

type SendMessageArguments = Pick<
  Message,
  "conversationId" | "senderId" | "body"
>;

export default resolvers;
