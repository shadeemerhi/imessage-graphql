import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Post {
    title: String
    author: String
    body: String
  }

  #   input NewPostInput {
  #     title: String!
  #     author: String!
  #     body: String!
  #   }

  type Query {
    posts: [Post]
  }

  #   type Mutation {
  #     addPost(post: NewPostInput!): [Post]
  #   }
`;

export default typeDefs;
