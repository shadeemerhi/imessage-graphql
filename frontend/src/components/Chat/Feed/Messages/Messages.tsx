import { useQuery } from "@apollo/client";
import { Flex, Text, Box } from "@chakra-ui/react";
import React from "react";
import toast from "react-hot-toast";
import MessageOperations, {
  MessagesData,
  MessagesVariables,
} from "../../../../graphql/operations/messages";

interface MessagesProps {
  conversationId: string;
}

const Messages: React.FC<MessagesProps> = ({ conversationId }) => {
  const { data, loading, error } = useQuery<MessagesData, MessagesVariables>(
    MessageOperations.Query.messages,
    {
      variables: {
        conversationId,
      },
    }
  );

  console.log("MESSAGES DATA", data, loading, error);

  if (error) {
    toast.error("Error fetching messages");
    return null;
  }

  return (
    <Flex direction="column" justify="flex-end">
      <Box p={4} _hover={{ bg: "whiteAlpha.200" }}>
        <Text>lmao dude</Text>
      </Box>
      <Box p={4} _hover={{ bg: "whiteAlpha.200" }}>
        <Text>Hello how are you</Text>
      </Box>
    </Flex>
  );
};
export default Messages;
