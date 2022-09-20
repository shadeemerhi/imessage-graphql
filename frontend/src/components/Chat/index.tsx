import { Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import React from "react";
import ConversationsWrapper from "./Conversations/ConversationsWrapper";
import FeedWrapper from "./Feed/FeedWrapper";
import ModalProvider from "../../context/ModalContext";

interface ChatProps {
  session: Session;
}

const Chat: React.FC<ChatProps> = ({ session }) => {
  return (
    <Flex height="100vh">
      <ModalProvider>
        <ConversationsWrapper session={session} />
        <FeedWrapper session={session} />
      </ModalProvider>
    </Flex>
  );
};
export default Chat;
