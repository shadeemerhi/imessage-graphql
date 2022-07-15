import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Query {
    conversations: [Conversation]
  }

  type Conversation {
    id: String
    latestMessage: Message
    participants: [Participants]
  }

  type Participants {
    id: String
    userId: String
    conversationId: String
  }

  type Message {
    id: String
    conversationId: String
    senderId: String
    body: String
  }
`;

export default typeDefs;
