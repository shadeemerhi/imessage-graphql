import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Post {
    author: String
    comment: String
  }

  #   input NewPostInput {
  #     title: String!
  #     author: String!
  #     body: String!
  #   }

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
    createUsername(username: String): Boolean
  }
`;

export default typeDefs;
