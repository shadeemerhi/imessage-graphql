import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import { formatUsernames } from "../../../util/functions";
import { ConversationFE } from "../../../util/types";
import { useMutation } from "@apollo/client";
import ConversationOperations from "../../../graphql/operations/conversations";
import toast from "react-hot-toast";

interface ConversationItemProps {
  conversation: ConversationFE;
  onClick: () => void;
  hasSeenLatestMessage?: boolean;
  selectedConversationId?: string;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  selectedConversationId,
  hasSeenLatestMessage,
  onClick,
}) => {
  const [deleteConversation] = useMutation<
    { deleteConversation: boolean },
    { conversationId: string }
  >(ConversationOperations.Mutations.deleteConversation);

  const onDelete = async (conversationId: string) => {
    try {
      const { data } = await deleteConversation({
        variables: {
          conversationId,
        },
        update: (cache) => {
          cache.updateQuery<{ conversations: Array<ConversationFE> }, null>(
            {
              query: ConversationOperations.Queries.conversations,
            },
            (data) => ({
              conversations: data
                ? data.conversations.filter(
                    (conversation) => conversation.id !== conversationId
                  )
                : [],
            })
          );
        },
      });

      if (!data) {
        throw new Error("Error deleting conversation");
      }

      /**
       * Update cache
       */

      console.log("DELETE RESPONSE", data);
    } catch (error: any) {
      console.log("deleteConversation error", error);
      toast.error(error.message);
    }
  };

  return (
    <Stack
      direction="row"
      align="center"
      justify="space-between"
      p={4}
      cursor="pointer"
      borderRadius={4}
      bg={
        conversation.id === selectedConversationId ? "whiteAlpha.200" : "none"
      }
      _hover={{ bg: "whiteAlpha.200" }}
      onClick={onClick}
      position="relative"
    >
      <Flex position="absolute" left="4px">
        {hasSeenLatestMessage === false && (
          <GoPrimitiveDot fontSize={18} color="#6B46C1" />
        )}
      </Flex>
      <Avatar />
      <Flex justify="space-between" width="80%">
        <Flex direction="column" width="70%">
          <Text
            fontWeight={600}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {formatUsernames(conversation.participants)}
          </Text>
          {conversation.latestMessage && (
            <Box>
              <Text
                color="whiteAlpha.700"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {conversation.latestMessage.body}
              </Text>
            </Box>
          )}
        </Flex>
        <Text color="whiteAlpha.700" textAlign="right">
          {moment(conversation.updatedAt).format("LT")}
        </Text>
        <AiOutlineDelete
          size={20}
          onClick={(event) => {
            event.stopPropagation();
            onDelete(conversation.id);
          }}
        />
      </Flex>
    </Stack>
  );
};
export default ConversationItem;
