import { gql } from "@apollo/client";

export default {
  Queries: {},
  Mutations: {
    createUsername: gql`
      mutation CreateUsername($userId: String!, $username: String!) {
        createUsername(userId: $userId, username: $username)
      }
    `,
  },
  Subscriptions: {},
};
