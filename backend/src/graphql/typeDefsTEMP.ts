import { gql } from "apollo-server-express";

const typeDefs = gql`
  # --- TESTING ---
  type Post {
    author: String
    comment: String
  }

  type Subscription {
    postCreated: Post
  }

  type Query {
    posts: [Post]
  }

  type Mutation {
    createPost(author: String, comment: String): Post
  }
  # --- TESTING ---

  type Mutation {
    createUsername(username: String!): CreateUsernameResponse
  }

  type CreateUsernameResponse {
    success: Boolean
    error: String
  }

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
