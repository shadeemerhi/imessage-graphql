import { gql } from "@apollo/client";
import { User } from "@prisma/client";

export default {
  Queries: {
    searchUsers: gql`
      query SearchUsers($username: String!) {
        searchUsers(username: $username) {
          id
          username
        }
      }
    `,
  },
  Mutations: {
    createUsername: gql`
      mutation CreateUsername($username: String!) {
        createUsername(username: $username) {
          success
          error
        }
      }
    `,
  },
  Subscriptions: {},
};

export interface ICreateUsernameVariables {
  username: string;
}

export interface ICreateUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}

export interface UserSearchInput {
  username: string;
}

export interface UserSearchData {
  searchUsers: Array<UserSearch>;
}

export type UserSearch = Pick<User, "id" | "username">;
