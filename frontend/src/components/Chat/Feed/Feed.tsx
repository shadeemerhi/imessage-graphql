import { Button, Flex } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import React from "react";

interface FeedProps {}

const Feed: React.FC<FeedProps> = () => {
  return (
    <Flex flexGrow={1}>
      <Button onClick={() => signOut()}>Logout</Button>
    </Flex>
  );
};
export default Feed;
