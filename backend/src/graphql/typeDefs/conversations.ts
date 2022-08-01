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
    hasSeenLatestMessage: Boolean
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

  type Mutation {
    markConversationAsRead(userId: String!, conversationId: String!): Boolean
  }

  type Mutation {
    deleteConversation(conversationId: String!): Boolean
  }

  type Subscription {
    conversationCreated: Conversation
  }

  type Subscription {
    conversationUpdated: Conversation
  }
`;

export default typeDefs;
