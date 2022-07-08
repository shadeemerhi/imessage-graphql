import { DefaultUser } from "next-auth";

export interface User {
  id: string;
  username: string;
}

export interface CreateUsernameResponse {
  success?: boolean;
  error?: string;
}

export interface Session {
  user?: User;
}

export interface GraphQLContext {
  session: Session | null;
}
