import { gql } from "@apollo/client";

export default {
  Mutations: {
    sendMessage: gql`
            mutation SendMessage($conversationId: String!, $senderId: String!, $body: String!)
        `,
  },
};

/**
 * Interfaces
 */

// Entities
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

// Operations
export type SendMessageVariables = Pick<
  Message,
  "conversationId" | "senderId" | "body"
>;
