import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import ConversationsWrapper from "./Conversations/ConversationsWrapper";
import Feed from "./Feed/Feed";

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
  const [selectedConversationId, setSelectedConversationId] = useState("");
  return (
    <Flex height="100vh">
      <ConversationsWrapper
        selectedConversationId={selectedConversationId}
        setSelectedConversationId={setSelectedConversationId}
      />
      <Feed
        selectedConversationId={selectedConversationId}
        setSelectedConversationId={setSelectedConversationId}
      />
    </Flex>
  );
};
export default Chat;
