import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import MessageInput from "./Input";

interface FeedProps {
  convId: string;
  setConvId: React.Dispatch<React.SetStateAction<string>>;
}

const Feed: React.FC<FeedProps> = ({ convId, setConvId }) => {
  return (
    <Flex
      display={{ base: convId ? "flex" : "none", md: "flex" }}
      direction="column"
      justify="space-between"
      flexGrow={1}
    >
      <Button
        display={{ base: "unset", md: "none" }}
        onClick={() => setConvId("")}
      >
        Back
      </Button>
      <Box>
        <Text>Hello</Text>
      </Box>
      <MessageInput />
    </Flex>
  );
};
export default Feed;
