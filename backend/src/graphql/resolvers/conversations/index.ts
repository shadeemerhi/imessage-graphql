import {
  Conversation,
  ConversationParticipants,
  Message,
} from "@prisma/client";
import { ApolloError } from "apollo-server-core";
import { GraphQLContext } from "../../../util/types";
import { PubSub, withFilter } from "graphql-subscriptions";

/**
 * @todo
 * Add to context
 */
const pubsub = new PubSub();

const resolvers = {
  Query: {
    conversations: async function getConversations(
      _: any,
      args: Record<string, never>,
      context: GraphQLContext
    ): Promise<Array<ConversationFE>> {
      const { session, prisma } = context;

      console.log("HERE IS SESSION", session);

      if (!session?.user) {
        throw new ApolloError("Not authorized");
      }

      try {
        const { id } = session.user;
        /**
         * Find all conversations that user is part of
         */
        const conversations = await prisma.conversation.findMany({
          // where: {
          //   participants: {
          //     some: {
          //       userId: {
          //         equals: id,
          //       },
          //     },
          //   },
          // },
          include: {
            participants: true,
          },
        });

        /**
         * Temporary until prisma filtering sorted out
         */
        return conversations.filter(
          (conversation) =>
            !!conversation.participants.find((p) => p.userId === id)
        );
      } catch (error: any) {
        console.log("error", error);
        throw new ApolloError(error?.message);
      }
    },
  },
  Mutation: {
    createConversation: async function (
      _: any,
      args: { participantIds: Array<string> },
      context: GraphQLContext
    ): Promise<boolean> {
      const { session, prisma } = context;
      const { participantIds } = args;
      console.log("PARTICIPANT IDS", participantIds);

      if (!session?.user) {
        throw new ApolloError("Not authorized");
      }

      const { id } = session.user;

      try {
        /**
         * create Conversation entity
         */
        const conversation = await prisma.conversation.create({
          data: {
            latestMessageId: "",
            participants: {
              createMany: {
                data: [id, ...participantIds].map((id) => ({ userId: id })),
              },
            },
          },
          include: {
            participants: true,
          },
        });

        console.log("HERE IS CONVERSATION", conversation);

        pubsub.publish("CONVERSATION_CREATED", {
          conversationCreated: conversation,
        });

        return true;
      } catch (error) {
        console.log("createConversation error", error);
        return false;
      }

      /**
       * use conversation.id along with args
       * to create ConversationParticipants
       */
    },
  },
  Subscription: {
    conversationCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(["CONVERSATION_CREATED"]),

        /**
         * @todo
         * Create payload type
         */
        (payload: any, _, context: GraphQLContext) => {
          const { session } = context;
          console.log("DOES THIS WORK", session?.user);
          console.log("HERE IS PAYLOAD", payload);

          if (!session?.user) {
            throw new ApolloError("Not authorized");
          }

          const { id } = session.user;

          /**
           * @todo
           * Test by creating another user who's not in conversation
           */
          const userIsParticipant =
            !!payload.conversationCreated.participants.find(
              (p: ConversationParticipants) => p.userId === id
            );

          return userIsParticipant;
        }
      ),
    },
  },
};

interface ConversationFE extends Conversation {
  participants: ConversationParticipants[];
  latestMessage?: Message;
}
export default resolvers;
