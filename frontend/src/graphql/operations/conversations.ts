import { gql } from "@apollo/client";

export default {
  Queries: {
    conversations: gql`
      query Conversations {
        conversations {
          participants
          latestMessage
        }
      }
    `,
  },
};

export interface IConversationsData {
  conversations: Array<Conversation>;
}

// temp
interface Conversation {
  id: string;
  latestMessageId: string;
  createdAt: Date;
  updatedAt: Date;
}
