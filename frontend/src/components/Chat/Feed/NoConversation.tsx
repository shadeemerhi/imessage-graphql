import { Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { BiMessageSquareDots } from "react-icons/bi";

const NoConversation: React.FC = () => {
  return (
    <Flex height="100%" justify="center" align="center">
      <Stack spacing={10} align="center">
        <Text fontSize={30}>Select a Conversation</Text>
        <BiMessageSquareDots fontSize={90} />
      </Stack>
    </Flex>
  );
};
export default NoConversation;
