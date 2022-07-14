import { gql } from "@apollo/client";

export default {
  Queries: {},
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
