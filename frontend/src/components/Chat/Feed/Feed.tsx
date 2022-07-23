import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import MessageInput from "./Input";
import NoConversation from "./NoConversation";

interface FeedProps {
  selectedConversationId: string;
  setSelectedConversationId: React.Dispatch<React.SetStateAction<string>>;
}

const Feed: React.FC<FeedProps> = ({
  selectedConversationId,
  setSelectedConversationId,
}) => {
  const router = useRouter();

  const { conversationId } = router.query;

  return (
    <Flex
      display={{ base: selectedConversationId ? "flex" : "none", md: "flex" }}
      direction="column"
      // position="relative"
      flexGrow={1}
      border="1px solid red"
    >
      {conversationId ? (
        <>
          <Flex
            direction="column"
            justify="flex-end"
            border="1px solid yellow"
            height="88%"
          >
            <Box p={4} _hover={{ bg: "whiteAlpha.200" }}>
              <Text>lmao dude</Text>
            </Box>
            <Box p={4} _hover={{ bg: "whiteAlpha.200" }}>
              <Text>Hello how are you</Text>
            </Box>
          </Flex>
          <MessageInput />
        </>
      ) : (
        <NoConversation />
      )}
    </Flex>
  );
};
export default Feed;
