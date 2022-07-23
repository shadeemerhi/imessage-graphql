import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import ConversationsWrapper from "./Conversations/ConversationsWrapper";
import Feed from "./Feed/Feed";

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
  return (
    <Flex height="100vh">
      <ConversationsWrapper />
      <Feed />
    </Flex>
  );
};
export default Chat;
