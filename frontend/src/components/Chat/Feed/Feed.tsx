import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import MessageInput from "./Input";

interface FeedProps {
  selectedConversationId: string;
  setSelectedConversationId: React.Dispatch<React.SetStateAction<string>>;
}

const Feed: React.FC<FeedProps> = ({
  selectedConversationId,
  setSelectedConversationId,
}) => {
  return (
    <Flex
      display={{ base: selectedConversationId ? "flex" : "none", md: "flex" }}
      direction="column"
      justify="space-between"
      flexGrow={1}
    >
      <Button
        display={{ base: "unset", md: "none" }}
        onClick={() => setSelectedConversationId("")}
      >
        Back
      </Button>
      <Box>
        <Text>Hello</Text>
      </Box>
      <MessageInput />
    </Flex>
  );
};
export default Feed;
