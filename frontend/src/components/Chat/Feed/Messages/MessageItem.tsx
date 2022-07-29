import { Stack, Avatar, Text, Flex, Box } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { MessageFE } from "../../../../util/types";

interface MessageItemProps {
  message: MessageFE;
  sentByMe: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, sentByMe }) => {
  return (
    <Stack
      direction="row"
      p={4}
      spacing={4}
      _hover={{ bg: "whiteAlpha.200" }}
      justify={sentByMe ? "flex-end" : "flex-start"}
    >
      {!sentByMe && (
        <Flex align="flex-end">
          <Avatar size="sm" />
        </Flex>
      )}
      <Stack spacing={1} width="100%">
        {!sentByMe && (
          <Text fontWeight={500} textAlign={sentByMe ? "right" : "left"}>
            {message.sender.username}
          </Text>
        )}
        <Stack direction={sentByMe ? "row-reverse" : "row"} align="center">
          <Box
            bg={sentByMe ? "purple.600" : "whiteAlpha.300"}
            px={2}
            py={1}
            borderRadius={12}
            maxWidth="65%"
          >
            <Text>{message.body}</Text>
          </Box>
          <Text fontSize={14} color="whiteAlpha.700">
            {moment(message.createdAt).format("LT")}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default MessageItem;
