import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import React from "react";
import MessageInput from "./Input";
import MessagesHeader from "./Messages/Header";
import Messages from "./Messages/Messages";
import NoConversationSelected from "./NoConversationSelected";

interface FeedWrapperProps {
  session: Session;
}

const FeedWrapper: React.FC<FeedWrapperProps> = ({ session }) => {
  const router = useRouter();

  const { conversationId } = router.query;

  return (
    <Flex
      display={{ base: conversationId ? "flex" : "none", md: "flex" }}
      direction="column"
      width="100%"
    >
      {conversationId && typeof conversationId === "string" ? (
        <>
          <Flex
            direction="column"
            justify="space-between"
            overflow="hidden"
            flexGrow={1}
          >
            <MessagesHeader
              userId={session.user.id}
              conversationId={conversationId}
            />
            <Messages
              userId={session.user.id}
              conversationId={conversationId}
            />
          </Flex>
          <MessageInput session={session} conversationId={conversationId} />
        </>
      ) : (
        <NoConversationSelected />
      )}
    </Flex>
  );
};
export default FeedWrapper;
