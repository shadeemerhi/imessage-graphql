import { gql } from "@apollo/client";

export default {
  Queries: {
    conversations: gql`
      query Conversations {
        conversations {
          id
          updatedAt
          participants {
            user {
              id
              username
            }
          }
          latestMessage {
            body
          }
        }
      }
    `,
  },
  Mutations: {
    createConversation: gql`
      mutation CreateConversation($participantIds: [String]!) {
        createConversation(participantIds: $participantIds) {
          conversationId
        }
      }
    `,
  },
  Subscriptions: {
    conversationCreated: gql`
      subscription ConversationCreated {
        conversationCreated {
          id
          updatedAt
          participants {
            user {
              id
              username
            }
          }
          latestMessage {
            body
          }
        }
      }
    `,
  },
};
