import { PrismaClient } from "@prisma/client";
import { PubSub } from "graphql-subscriptions";

export interface User {
  id: string;
  username: string;
}

export interface Session {
  user?: User;
}

export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
  pubsub: PubSub;
}
