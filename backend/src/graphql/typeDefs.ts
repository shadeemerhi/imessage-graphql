import { gql } from "apollo-server-express";

const typeDefs = gql`
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

  type Mutation {
    createUsername(username: String!): CreateUsernameResponse
  }

  type CreateUsernameResponse {
    success: Boolean
    error: String
  }
`;

export default typeDefs;
