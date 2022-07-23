import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Mutation {
    sendMessage(conversationId: String, senderId: String, body: String): Boolean
  }
`;

export default typeDefs;
