import { Box, Input } from "@chakra-ui/react";
import React from "react";

interface MessageInputProps {}

const MessageInput: React.FC<MessageInputProps> = () => {
  return (
    <Box px={4} py={8}>
      <Input
        size="lg"
        placeholder="New message"
        color="whiteAlpha.900"
        _focus={{
          boxShadow: "none",
          border: "1px solid",
          borderColor: "whiteAlpha.300",
        }}
        _hover={{
          borderColor: "whiteAlpha.300",
        }}
      />
    </Box>
  );
};
export default MessageInput;
