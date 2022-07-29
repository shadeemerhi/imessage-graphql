import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { GoPrimitiveDot } from "react-icons/go";
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
      align="center"
      justify="space-between"
      p={4}
      cursor="pointer"
      borderRadius={4}
      bg={conversation.id === conversationId ? "whiteAlpha.200" : "none"}
      _hover={{ bg: "whiteAlpha.200" }}
      onClick={onViewConversation}
      position="relative"
    >
      <Flex position="absolute" left="4px">
        {!hasSeenLatestMessage && (
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
      </Flex>
    </Stack>
  );
};
export default ConversationItem;
