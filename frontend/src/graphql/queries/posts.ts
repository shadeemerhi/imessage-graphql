import { gql } from "@apollo/client";

const POST_QUERIES = {
  posts: gql`
    query Posts {
      posts {
        author
        comment
      }
    }
  `,
};

export default POST_QUERIES;
