import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Message {
    sender: User
    body: String
    createdAt: Date
  }

  type Query {
    messages(conversationId: String): [Message]
  }

  type Mutation {
    sendMessage(conversationId: String, senderId: String, body: String): Boolean
  }
`;

export default typeDefs;
