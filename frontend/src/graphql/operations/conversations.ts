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
  conversations: {
    participants: string[];
    latestMessage: any; // will be Message
  };
}
