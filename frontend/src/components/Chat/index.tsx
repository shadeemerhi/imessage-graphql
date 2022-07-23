import { Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import React from "react";
import ConversationsWrapper from "./Conversations/ConversationsWrapper";
import Feed from "./Feed/Feed";

interface ChatProps {
  session: Session;
}

const Chat: React.FC<ChatProps> = ({ session }) => {
  return (
    <Flex height="100vh">
      <ConversationsWrapper />
      <Feed session={session} />
    </Flex>
  );
};
export default Chat;
