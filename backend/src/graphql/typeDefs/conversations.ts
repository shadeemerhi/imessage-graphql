import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Conversation {
    id: String
    latestMessage: Message
    participants: [Participants]
    updatedAt: Date
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

  type Query {
    conversations: [Conversation]
  }

  type Mutation {
    createConversation(participantIds: [String]): Boolean
  }

  type Subscription {
    conversationCreated: Conversation
  }
`;

export default typeDefs;
