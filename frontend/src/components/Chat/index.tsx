import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Conversations from "./Conversations/Conversations";
import Feed from "./Feed/Feed";

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
  const [convId, setConvId] = useState("");
  return (
    <Flex height="100vh">
      <Conversations convId={convId} setConvId={setConvId} />
      <Feed convId={convId} setConvId={setConvId} />
    </Flex>
  );
};
export default Chat;
