import userResolvers from "./users";
import conversationResolvers from "./conversations";
import merge from "lodash.merge";

const resolvers = merge({}, userResolvers, conversationResolvers);

export default resolvers;
