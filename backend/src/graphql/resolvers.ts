import { PubSub } from "graphql-subscriptions";
import { createUsername } from "../db/helpers/users";
import { GraphQLContext } from "../util/types";

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
    ): Promise<boolean> {
      const { session } = context;

      if (!session?.user) {
        return false;
      }

      const { id } = session.user;
      const { username } = args;

      console.log("HERE IS USER ID", session.user.id);

      return await createUsername(id, username);
    },
  },
};

export default resolvers;
