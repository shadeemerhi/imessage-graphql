import { ApolloClient, useQuery, useSubscription } from "@apollo/client";
import { Stack } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import ConversationOperations from "../../../graphql/operations/conversations";
import {
  ConversationsData,
  ConversationCreatedSubscriptionData,
  ConversationUpdatedData,
} from "../../../util/types";
import SkeletonLoader from "../../common/SkeletonLoader";
import ConversationList from "./ConversationList";
import { ConversationFE } from "../../../util/types";

interface ConversationsProps {
  session: Session;
}

const ConversationsWrapper: React.FC<ConversationsProps> = ({ session }) => {
  const router = useRouter();
  const { conversationId } = router.query;

  const { data, loading, error, subscribeToMore } = useQuery<
    ConversationsData,
    null
  >(ConversationOperations.Queries.conversations);

  const { data: subData } = useSubscription<ConversationUpdatedData, null>(
    ConversationOperations.Subscriptions.conversationUpdated,
    {
      onSubscriptionData: ({ client, subscriptionData }) => {
        /**
         * @todo
         * Take latestMessage from subscriptionData and
         * write it to message query for conversation
         */
      },
    }
  );

  console.log("SUB DATA", subData);

  const subscribeToNewConversations = () => {
    subscribeToMore({
      document: ConversationOperations.Subscriptions.conversationCreated,
      updateQuery: (
        prev,
        { subscriptionData }: ConversationCreatedSubscriptionData
      ) => {
        if (!subscriptionData.data) return prev;

        const newConversation = subscriptionData.data.conversationCreated;

        return Object.assign({}, prev, {
          conversations: [newConversation, ...prev.conversations],
        });
      },
    });
  };

  /**
   * Execute subscription on mount
   */
  useEffect(() => {
    subscribeToNewConversations();
  }, []);

  if (error) {
    toast.error("There was an error fetching conversations");
    return null;
  }

  return (
    <Stack
      direction="column"
      display={{ base: conversationId ? "none" : "flex", md: "flex" }}
      width={{ base: "100%", md: "40%" }}
      maxWidth={{ base: "none", md: "400px" }}
      bg="whiteAlpha.50"
      py={6}
      px={3}
      position="relative"
    >
      {loading ? (
        <SkeletonLoader count={7} height="80px" width="100%" />
      ) : (
        <ConversationList
          userId={session.user.id}
          conversations={data?.conversations || []}
        />
      )}
    </Stack>
  );
};
export default ConversationsWrapper;
