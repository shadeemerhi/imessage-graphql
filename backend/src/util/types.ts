import { PrismaClient } from "@prisma/client";

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
}
