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
 * Currently unsure of how to access
 * context pubsub in withFilter
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
          /**
           * Below has been confirmed to be the correct
           * query by the Prisma team. Has been confirmed
           * that there is an issue on their end
           * Issue seems specific to Mongo
           */
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
            latestMessage: true,
          },
        });

        /**
         * Since above query does not work
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
    ): Promise<{ conversationId: string }> {
      const { session, prisma } = context;
      const { participantIds } = args;

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

        return { conversationId: conversation.id };
      } catch (error) {
        console.log("createConversation error", error);
        throw new ApolloError("Error creating conversation");
      }
    },
  },
  Subscription: {
    conversationCreated: {
      subscribe: withFilter(
        /**
         * @todo
         * Not sure how to access context pubsub here
         */
        () => pubsub.asyncIterator(["CONVERSATION_CREATED"]),
        (
          payload: CreateConversationSubscriptionPayload,
          _,
          context: GraphQLContext
        ) => {
          const { session } = context;

          if (!session?.user) {
            throw new ApolloError("Not authorized");
          }

          const { id } = session.user;

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
  participants: Array<ConversationParticipants>;
  latestMessage: Message | null;
}

interface NewConveration extends Conversation {
  participants: Array<ConversationParticipants>;
}

interface CreateConversationSubscriptionPayload {
  conversationCreated: NewConveration;
}

export default resolvers;
