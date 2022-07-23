import { useMutation } from "@apollo/client";
import { Box, Input } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import React from "react";
import MessageOperations, {
  SendMessageVariables,
} from "../../../graphql/operations/messages";

interface MessageInputProps {
  session: Session;
  conversationId: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  session,
  conversationId,
}) => {
  const [sendMessage] = useMutation<boolean, SendMessageVariables>(
    MessageOperations.Mutations.sendMessage
  );

  const onSendMessage = async () => {};

  return (
    <Box px={4} py={8} width="100%" flexGrow={1}>
      <form onSubmit={onSendMessage}>
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
      </form>
    </Box>
  );
};
export default MessageInput;
