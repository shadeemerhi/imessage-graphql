import { gql } from "@apollo/client";

export default {
  Queries: {
    conversations: gql`
      query Conversations {
        conversations {
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

interface ConversationFE extends Conversation {
  participants: ConversationParticipants[];
  latestMessage: Message;
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
