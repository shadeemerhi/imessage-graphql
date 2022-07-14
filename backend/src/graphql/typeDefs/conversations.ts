import { gql } from "apollo-server-core";

const typeDefs = gql`
  # Need to revisit this
  type Conversation {
    id: String
    latestMessageId: String
  }

  type Query {
    conversations: [Conversation]
  }
`;

export default typeDefs;
