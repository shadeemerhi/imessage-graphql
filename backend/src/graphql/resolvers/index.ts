import merge from "lodash.merge";
import conversationResolvers from "./conversations";
import userResolvers from "./users";
import scalarResolvers from "./scalars";

const resolvers = merge(
  {},
  scalarResolvers,
  userResolvers,
  conversationResolvers
);

export default resolvers;
