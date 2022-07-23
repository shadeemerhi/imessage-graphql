import { gql } from "@apollo/client";
import { Message } from "./messages";

export default {
  Queries: {
    conversations: gql`
      query Conversations {
        conversations {
          id
          updatedAt
          participants {
            user {
              id
              username
            }
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
            user {
              id
              username
            }
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
  participants: Array<ConversationParticipant>;
  latestMessage: Message | null;
}

export interface ConversationParticipant {
  user: {
    id: string;
    username: string;
  };
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
