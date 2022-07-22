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
    user: User
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

  type CreateConversationResponse {
    conversationId: String
  }

  type Mutation {
    createConversation(participantIds: [String]): CreateConversationResponse
  }

  type Subscription {
    conversationCreated: Conversation
  }
`;

export default typeDefs;
