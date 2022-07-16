import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import ConversationsWrapper from "./Conversations/ConversationsWrapper";
import Feed from "./Feed/Feed";

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
  const [convId, setConvId] = useState("");
  return (
    <Flex height="100vh">
      <ConversationsWrapper convId={convId} setConvId={setConvId} />
      <Feed convId={convId} setConvId={setConvId} />
    </Flex>
  );
};
export default Chat;
