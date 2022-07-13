import { Avatar, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import moment from "moment";

interface ConversationsProps {}

const testConversations = [
  {
    id: "12345",
    otherPersonName: "Sunny",
    latestMessage: {
      body: "Hey dude lol",
      created_at: Date.now(),
    },
  },
];

const Conversations: React.FC<ConversationsProps> = () => {
  return (
    <Flex
      direction="column"
      width="30%"
      maxWidth="360px"
      bg="whiteAlpha.50"
      p={2}
    >
      {testConversations.map((conversation) => (
        <Stack
          key={conversation.id}
          direction="row"
          spacing={4}
          p={4}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "whiteAlpha.200" }}
        >
          <Avatar />
          <Flex justify="space-between" width="100%">
            <Flex direction="column">
              <Text fontWeight={600}>{conversation.otherPersonName}</Text>
              <Text color="whiteAlpha.700">
                {conversation.latestMessage.body}
              </Text>
            </Flex>
            <Text color="whiteAlpha.700">
              {moment(conversation.latestMessage.created_at).format("LT")}
            </Text>
          </Flex>
        </Stack>
      ))}
    </Flex>
  );
};
export default Conversations;
