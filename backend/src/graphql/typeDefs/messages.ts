import { gql } from "apollo-server-core";

const typeDefs = gql`
  type MessagesResponse {
    senderId: String
    body: String
    createdAt: String
  }

  type Query {
    messages(conversationId: String): MessagesResponse
  }

  type Mutation {
    sendMessage(conversationId: String, senderId: String, body: String): Boolean
  }
`;

export default typeDefs;
