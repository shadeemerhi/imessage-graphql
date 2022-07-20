import { useQuery } from "@apollo/client";
import { Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import ConversationOperations, {
  ConversationsData,
} from "../../../graphql/operations/conversations";
import ConversationList from "./ConversationList";
import ConversationLoader from "./Loader";

interface ConversationsProps {
  convId: string;
  setConvId: React.Dispatch<React.SetStateAction<string>>;
}

const ConversationsWrapper: React.FC<ConversationsProps> = ({
  convId,
  setConvId,
}) => {
  const { data, loading, error, subscribeToMore } = useQuery<
    ConversationsData,
    null
  >(ConversationOperations.Queries.conversations);

  console.log("HERE IS CONVERSATION DATA", data, loading, error);

  const subscribeToNewConversations = () => {
    subscribeToMore({
      document: ConversationOperations.Subscriptions.conversationCreated,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        /**
         * @todo
         * address TS issue below
         */
        // @ts-ignore
        const newConversation = subscriptionData.data.conversationCreated;

        console.log("SUB DATA", subscriptionData);

        console.log("PREV CONVERSATIONS", prev);

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
      display={{ base: convId ? "none" : "flex", md: "flex" }}
      width={{ base: "100%", md: "30%" }}
      maxWidth={{ base: "none", md: "360px" }}
      bg="whiteAlpha.50"
      py={6}
      px={3}
      position="relative"
    >
      {loading ? (
        <ConversationLoader />
      ) : (
        <ConversationList
          conversations={data?.conversations || []}
          setConvId={setConvId}
          // subscribeToNewConversations={() =>
          //     subscribeToMore({
          //       document:
          //     })
          // }
        />
      )}
    </Stack>
  );
};
export default ConversationsWrapper;
