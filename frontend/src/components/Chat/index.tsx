import React from "react";
import Conversations from "./Conversations/Conversations";
import Feed from "./Feed/Feed";

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
  return (
    <div className="flex w-full border border-orange-500">
      <Conversations />
      <Feed />
    </div>
  );
};
export default Chat;
