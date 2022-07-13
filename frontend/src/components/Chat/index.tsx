import { Flex } from "@chakra-ui/react";
import React from "react";
import Conversations from "./Conversations/Conversations";
import Feed from "./Feed/Feed";

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
  return (
    <Flex height="100vh" border="1px solid red">
      <Conversations />
      <Feed />
    </Flex>
  );
};
export default Chat;
