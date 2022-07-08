import React from "react";
import Conversations from "./Conversations/Conversations";
import Feed from "./Feed/Feed";

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
  return (
    <div>
      <Conversations />
      <Feed />
    </div>
  );
};
export default Chat;
