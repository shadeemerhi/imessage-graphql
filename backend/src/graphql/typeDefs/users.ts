import { gql } from "apollo-server-core";

const typeDefs = gql`
  type User {
    username: String
  }

  type SearchUsersResponse {
    users: [User]
  }

  type Query {
    searchUsers(username: String!): SearchUsersResponse
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
