import { gql } from "@apollo/client";

export default {
  Queries: {
    conversations: gql`
      query Conversations {
        conversations {
          id
          participants {
            userId
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
        createConversation(participantIds: $participantIds)
      }
    `,
  },
};

export interface ConversationsData {
  conversations: Array<ConversationFE>;
}

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
