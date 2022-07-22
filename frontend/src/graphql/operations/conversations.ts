import { gql } from "@apollo/client";

export default {
  Queries: {
    conversations: gql`
      query Conversations {
        conversations {
          id
          updatedAt
          participants {
            userId
            # username
          }
          latestMessage {
            body
          }
        }
      }
    `,
  },
  Mutations: {
    createConversation: gql`
      mutation CreateConversation($participantIds: [String]!) {
        createConversation(participantIds: $participantIds) {
          conversationId
        }
      }
    `,
  },
  Subscriptions: {
    conversationCreated: gql`
      subscription ConversationCreated {
        conversationCreated {
          id
          updatedAt
          participants {
            userId
            # username
          }
          latestMessage {
            body
          }
        }
      }
    `,
  },
};

/**
 * Interfaces
 * @todo
 * Consider moving to a different file
 */

// Entities
interface Conversation {
  id: string;
  latestMessageId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationFE extends Conversation {
  participants: ConversationParticipants[];
  latestMessage: Message | null;
}

interface ConversationParticipants {
  id: string;
  userId: string;
  conversationId: string;
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

// Operations
export interface CreateConversationData {
  createConversation: {
    conversationId: string;
  };
}

export interface ConversationsData {
  conversations: Array<ConversationFE>;
}

export interface ConversationSubscriptionData {
  subscriptionData: {
    data: {
      conversationCreated: ConversationFE;
    };
  };
}
