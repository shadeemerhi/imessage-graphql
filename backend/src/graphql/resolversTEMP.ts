import { PubSub } from "graphql-subscriptions";
import { GraphQLContext } from "../util/types";
import { verifyAndCreateUsername } from "./resolvers/users/helpers";

const pubsub = new PubSub();

interface Post {
  author: string;
  comment: string;
}

// Test data
const posts = [
  {
    author: "Kate Chopin",
    comment: "Here is a post",
  },
  {
    author: "Paul Auster",
    comment: "This is my first post",
  },
];

const resolvers = {
  Query: {
    posts: () => posts,
  },

  Subscription: {
    postCreated: {
      subscribe: () => pubsub.asyncIterator(["POST_CREATED"]),
    },
  },

  Mutation: {
    createPost: (
      _: any,
      args: { author: string; comment: string },
      context: any
    ): Post => {
      console.log("HERE IS THE INPUT", args);
      pubsub.publish("POST_CREATED", { postCreated: args });
      const { author, comment } = args;
      const newPost = { author, comment };
      posts.push(newPost);
      return newPost;
    },

    async createUsername(
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<any> {
      const { session } = context;

      if (!session?.user) {
        return {
          error: "Not authorized",
        };
      }

      const { id } = session.user;
      const { username } = args;

      return await verifyAndCreateUsername(id, username);
    },
  },
};

export default resolvers;
