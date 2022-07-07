import { gql } from "@apollo/client";

export default {
  Queries: {
    posts: gql`
      query Posts {
        posts {
          author
          comment
        }
      }
    `,
  },
  Mutations: {
    createPost: gql`
      mutation CreatePost($author: String, $comment: String) {
        createPost(author: $author, comment: $comment) {
          author
          comment
        }
      }
    `,
  },
  Subscriptions: {},
};
