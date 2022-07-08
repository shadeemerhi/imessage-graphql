import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import React from "react";

interface FeedProps {}

const Feed: React.FC<FeedProps> = () => {
  return (
    <div>
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
};
export default Feed;
