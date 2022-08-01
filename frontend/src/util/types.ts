import { User } from "@prisma/client";

/**
 * Users
 */
export interface CreateUsernameVariables {
  username: string;
}

export interface CreateUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}

export interface SearchUsersInputs {
  username: string;
}

export interface SearchUsersData {
  searchUsers: Array<SearchedUser>;
}

export type SearchedUser = Pick<User, "id" | "username">;

/**
 * Messages
 */
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageFE {
  id: string;
  body: string;
  sender: {
    id: string;
    username: string;
  };
  createdAt: Date;
}

export interface MessagesData {
  messages: Array<MessageFE>;
}

export interface MessagesVariables {
  conversationId: string;
}

export interface SendMessageVariables {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
}

export interface MessagesSubscriptionData {
  subscriptionData: {
    data: {
      messageSent: MessageFE;
    };
  };
}

/**
 * Conversations
 */
interface Conversation {
  id: string;
  latestMessageId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationFE extends Conversation {
  participants: Array<ConversationParticipant>;
  latestMessage: MessageFE | null;
}

export interface ConversationParticipant {
  user: {
    id: string;
    username: string;
  };
  hasSeenLatestMessage: boolean;
}

/**
 * GraphQL Operations
 */
export interface CreateConversationData {
  createConversation: {
    conversationId: string;
  };
}

export interface ConversationsData {
  conversations: Array<ConversationFE>;
}

export interface ConversationCreatedSubscriptionData {
  subscriptionData: {
    data: {
      conversationCreated: ConversationFE;
    };
  };
}

export interface ConversationUpdatedData {
  conversationUpdated: Omit<ConversationFE, "latestMessage"> & {
    latestMessage: MessageFE;
  };
}

export interface ConversationDeletedData {
  conversationDeleted: {
    id: string;
  };
}
