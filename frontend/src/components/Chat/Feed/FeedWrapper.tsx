import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import React from "react";
import MessageInput from "./Input";
import Messages from "./Messages/Messages";
import NoConversation from "./NoConversation";

interface FeedWrapperProps {
  session: Session;
}

const FeedWrapper: React.FC<FeedWrapperProps> = ({ session }) => {
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
            <Messages conversationId={conversationId} />
          </Flex>
          <MessageInput session={session} conversationId={conversationId} />
        </>
      ) : (
        <NoConversation />
      )}
    </Flex>
  );
};
export default FeedWrapper;
