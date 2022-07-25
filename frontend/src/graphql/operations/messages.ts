import { gql } from "@apollo/client";

export default {
  Query: {
    messages: gql`
      query Messages($conversationId: String!) {
        messages(conversationId: $conversationId) {
          id
          sender {
            id
            username
          }
          body
          createdAt
        }
      }
    `,
  },
  Mutations: {
    sendMessage: gql`
      mutation SendMessage(
        $id: String!
        $conversationId: String!
        $senderId: String!
        $body: String!
      ) {
        sendMessage(
          id: $id
          conversationId: $conversationId
          senderId: $senderId
          body: $body
        )
      }
    `,
  },
  Subscriptions: {
    messageSent: gql`
      subscription MessageSent($conversationId: String!) {
        messageSent(conversationId: $conversationId) {
          id
          sender {
            id
            username
          }
          body
          createdAt
        }
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
  id: string;
  body: string;
  sender: {
    id: string;
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

export interface SendMessageVariables {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
}

export interface MessagesSubscriptionData {
  subscriptionData: {
    data: {
      messageSent: MessageFE;
    };
  };
}
