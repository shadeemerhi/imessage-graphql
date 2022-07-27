import { Avatar, Flex, Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { formatUsernames } from "../../../util/functions";
import { ConversationFE } from "../../../util/types";

interface ConversationItemProps {
  conversation: ConversationFE;
  conversationId: string;
  hasSeenLatestMessage: boolean;
  onViewConversation: () => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  conversationId,
  hasSeenLatestMessage,
  onViewConversation,
}) => {
  return (
    <Stack
      direction="row"
      spacing={4}
      p={4}
      cursor="pointer"
      borderRadius={4}
      border={!hasSeenLatestMessage ? "1px solid blue" : "none"}
      bg={conversation.id === conversationId ? "whiteAlpha.200" : "none"}
      _hover={{ bg: "whiteAlpha.200" }}
      onClick={onViewConversation}
    >
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
            <Text color="whiteAlpha.700">
              {conversation.latestMessage.body}
            </Text>
          )}
        </Flex>
        <Text color="whiteAlpha.700">
          {moment(conversation.updatedAt).format("LT")}
        </Text>
      </Flex>
    </Stack>
  );
};
export default ConversationItem;
