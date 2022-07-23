import { gql } from "@apollo/client";

export default {
  Query: {
    messages: gql`
      query Messages($conversationId: String!) {
        senderId
        body
        createdAt
      }
    `,
  },
  Mutations: {
    sendMessage: gql`
      mutation SendMessage(
        $conversationId: String!
        $senderId: String!
        $body: String!
      ) {
        sendMessage(
          conversationId: $conversationId
          senderId: $senderId
          body: $body
        )
      }
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

export interface MessageFE {
  body: string;
  sender: {
    username: string;
  };
  createdAt: Date;
}

// Operations
export interface MessagesData {
  messages: Array<MessageFE>;
}

export interface MessagesVariables {
  conversationId: string;
}

export type SendMessageVariables = Pick<
  Message,
  "conversationId" | "senderId" | "body"
>;
