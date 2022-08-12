import { Prisma, PrismaClient } from "@prisma/client";
import { PubSub } from "graphql-subscriptions";
import { Context } from "graphql-ws/lib/server";
import {
  conversationPopulated,
  participantPopulated,
} from "../graphql/resolvers/conversations";
import { messagePopulated } from "../graphql/resolvers/messages";

/**
 * Server Configuration
 */
export interface Session {
  user?: User;
}

export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
  pubsub: PubSub;
}

export interface SubscriptionContext extends Context {
  connectionParams: {
    session?: Session;
  };
}

/**
 * Users
 */
export interface User {
  id: string;
  username: string;
}

export interface CreateUsernameResponse {
  success?: boolean;
  error?: string;
}

export interface SearchUsersResponse {
  users: Array<User>;
}

/**
 * Messages
 */
export interface SendMessageArguments {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
}

export interface SendMessageSubscriptionPayload {
  messageSent: MessagePopulated;
}

export type MessagePopulated = Prisma.MessageGetPayload<{
  include: typeof messagePopulated;
}>;

/**
 * Conversations
 */
export type ConversationPopulated = Prisma.ConversationGetPayload<{
  include: typeof conversationPopulated;
}>;

export type ParticipantPopulated = Prisma.ConversationParticipantGetPayload<{
  include: typeof participantPopulated;
}>;

export interface ConversationCreatedSubscriptionPayload {
  conversationCreated: ConversationPopulated;
}

export interface ConversationUpdatedSubscriptionData {
  conversationUpdated: {
    conversation: ConversationPopulated;
    addedUserIds: Array<string>;
    removedUserIds: Array<string>;
  };
}

export interface ConversationDeletedSubscriptionPayload {
  conversationDeleted: ConversationPopulated;
}
