import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import React from "react";
import MessageInput from "./Input";

interface FeedProps {}

const Feed: React.FC<FeedProps> = () => {
  return (
    <Flex direction="column" justify="space-between" flexGrow={1}>
      {/* <Button onClick={() => signOut()}>Logout</Button> */}
      <Box>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
      </Box>
      <MessageInput />
    </Flex>
  );
};
export default Feed;
