import { ApolloError } from "apollo-server-core";
import { withFilter } from "graphql-subscriptions";
import {
  ConversationFE,
  CreateConversationSubscriptionPayload,
  DeleteConversationSubscriptionPayload,
  GraphQLContext,
} from "../../util/types";

const resolvers = {
  Query: {
    conversations: async function getConversations(
      _: any,
      args: Record<string, never>,
      context: GraphQLContext
    ): Promise<Array<ConversationFE>> {
      const { session, prisma } = context;

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
            participants: {
              include: {
                user: {
                  select: {
                    id: true,
                    username: true,
                  },
                },
              },
            },
            latestMessage: {
              include: {
                sender: {
                  select: {
                    id: true,
                    username: true,
                  },
                },
              },
            },
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
      const { session, prisma, pubsub } = context;
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
                data: [id, ...participantIds].map((id) => ({
                  userId: id,
                  hasSeenLatestMessage: false,
                })),
              },
            },
          },
          include: {
            participants: {
              include: {
                user: {
                  select: {
                    id: true,
                    username: true,
                  },
                },
              },
            },
          },
        });

        pubsub.publish("CONVERSATION_CREATED", {
          conversationCreated: conversation,
        });

        return { conversationId: conversation.id };
      } catch (error) {
        console.log("createConversation error", error);
        throw new ApolloError("Error creating conversation");
      }
    },
    markConversationAsRead: async function (
      _: any,
      args: { userId: string; conversationId: string },
      context: GraphQLContext
    ): Promise<boolean> {
      const { userId, conversationId } = args;
      const { session, prisma } = context;

      if (!session?.user) {
        throw new ApolloError("Not authorized");
      }

      try {
        await prisma.conversationParticipants.updateMany({
          where: {
            userId,
            conversationId,
          },
          data: {
            hasSeenLatestMessage: true,
          },
        });

        return true;
      } catch (error: any) {
        console.log("markConversationAsRead error", error);
        throw new ApolloError(error.message);
      }
    },
    deleteConversation: async function (
      _: any,
      args: { conversationId: string },
      context: GraphQLContext
    ): Promise<boolean> {
      const { session, prisma, pubsub } = context;
      const { conversationId } = args;

      if (!session?.user) {
        throw new ApolloError("Not authorized");
      }

      try {
        /**
         * Delete conversation and all related entities
         */
        const deletedConversation = await prisma.conversation.delete({
          where: {
            id: conversationId,
          },
          include: {
            participants: true,
          },
        });

        await prisma.conversationParticipants.deleteMany({
          where: {
            conversationId,
          },
        });

        await prisma.message.deleteMany({
          where: {
            conversationId,
          },
        });

        pubsub.publish("CONVERSATION_DELETED", {
          conversationDeleted: deletedConversation,
        });

        return true;
      } catch (error: any) {
        console.log("deleteConversation error", error);
        throw new ApolloError(error?.message);
      }
    },
  },
  Subscription: {
    conversationCreated: {
      subscribe: withFilter(
        (_: any, __: any, context: GraphQLContext) => {
          const { pubsub } = context;

          return pubsub.asyncIterator(["CONVERSATION_CREATED"]);
        },
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
          const {
            conversationCreated: { participants },
          } = payload;

          const userIsParticipant = !!participants.find(
            (p) => p.user.id === id
          );

          return userIsParticipant;
        }
      ),
    },
    conversationUpdated: {
      subscribe: (_: any, __: any, context: GraphQLContext) => {
        const { pubsub } = context;

        return pubsub.asyncIterator(["CONVERSATION_UPDATED"]);
      },
    },
    conversationDeleted: {
      subscribe: withFilter(
        (_: any, __: any, context: GraphQLContext) => {
          const { pubsub } = context;

          return pubsub.asyncIterator(["CONVERSATION_DELETED"]);
        },
        (
          payload: DeleteConversationSubscriptionPayload,
          _,
          context: GraphQLContext
        ) => {
          const { session } = context;

          if (!session?.user) {
            throw new ApolloError("Not authorized");
          }

          const { id } = session.user;
          const {
            conversationDeleted: { participants },
          } = payload;

          const userIsParticipant = !!participants.find((p) => p.userId === id);

          return userIsParticipant;
        }
      ),
    },
  },
};

export default resolvers;
