import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Conversation {
    id: String
    latestMessage: Message
    participants: [Participant]
    updatedAt: Date
  }

  type Participant {
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

  type ConversationDeletedResponse {
    id: String
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

  type Mutation {
    updateParticipants(
      conversationId: String!
      participantIds: [String]!
    ): Boolean
  }

  type Subscription {
    conversationCreated: Conversation
  }

  type Subscription {
    conversationUpdated: Conversation
  }

  type Subscription {
    conversationDeleted: ConversationDeletedResponse
  }
`;

export default typeDefs;
