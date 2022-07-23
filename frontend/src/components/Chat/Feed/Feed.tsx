import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import MessageInput from "./Input";
import NoConversation from "./NoConversation";

interface FeedProps {}

const Feed: React.FC<FeedProps> = ({}) => {
  const router = useRouter();

  const { conversationId } = router.query;

  /**
   * @todo
   * Will need to get conversation from apollo cache
   * to display participants in header
   */

  return (
    <Flex
      display={{ base: conversationId ? "flex" : "none", md: "flex" }}
      direction="column"
      flexGrow={1}
    >
      {conversationId ? (
        <>
          <Flex direction="column" justify="space-between" height="88%">
            <Stack
              direction="row"
              align="center"
              spacing={6}
              p={4}
              borderBottom="1px solid"
              borderColor="whiteAlpha.200"
            >
              <Button
                display={{ md: "none" }}
                onClick={() =>
                  router.replace("?conversationId", "/", {
                    shallow: true,
                  })
                }
              >
                Back
              </Button>
              <Text>{conversationId}</Text>
            </Stack>
            <Flex direction="column" justify="flex-end">
              <Box p={4} _hover={{ bg: "whiteAlpha.200" }}>
                <Text>lmao dude</Text>
              </Box>
              <Box p={4} _hover={{ bg: "whiteAlpha.200" }}>
                <Text>Hello how are you</Text>
              </Box>
            </Flex>
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
