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
            hasSeenLatestMessage
          }
          latestMessage {
            createdAt
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
    markConversationAsRead: gql`
      mutation MarkConversationAsRead(
        $userId: String!
        $conversationId: String!
      ) {
        markConversationAsRead(userId: $userId, conversationId: $conversationId)
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
            createdAt
            body
          }
        }
      }
    `,
    conversationUpdated: gql`
      subscription ConversationUpdated {
        conversationUpdated {
          id
          updatedAt
          participants {
            user {
              id
              username
            }
            hasSeenLatestMessage
          }
          latestMessage {
            createdAt
            body
          }
        }
      }
    `,
  },
};
