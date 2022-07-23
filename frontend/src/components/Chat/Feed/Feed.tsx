import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import React from "react";
import MessageInput from "./Input";
import NoConversation from "./NoConversation";

interface FeedProps {
  session: Session;
}

const Feed: React.FC<FeedProps> = ({ session }) => {
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
      {conversationId && typeof conversationId === "string" ? (
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

            {/* MESSAGE FEED */}
            <Flex direction="column" justify="flex-end">
              <Box p={4} _hover={{ bg: "whiteAlpha.200" }}>
                <Text>lmao dude</Text>
              </Box>
              <Box p={4} _hover={{ bg: "whiteAlpha.200" }}>
                <Text>Hello how are you</Text>
              </Box>
            </Flex>
            {/* MESSAGE FEED */}
          </Flex>
          <MessageInput session={session} conversationId={conversationId} />
        </>
      ) : (
        <NoConversation />
      )}
    </Flex>
  );
};
export default Feed;
