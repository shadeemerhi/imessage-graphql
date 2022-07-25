import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { ConversationFE } from "../../../util/types";
import ConversationItem from "./ConversationItem";
import CreateConversationModal from "./CreateModal/CreateModal";

interface ConversationListProps {
  conversations: Array<ConversationFE>;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
}) => {
  const {
    isOpen: modalIsOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const router = useRouter();

  const { conversationId } = router.query;

  return (
    <>
      <Box
        py={2}
        px={4}
        mb={4}
        bg="blackAlpha.300"
        borderRadius={4}
        cursor="pointer"
        onClick={onModalOpen}
      >
        <Text color="whiteAlpha.800" fontWeight={500}>
          Find or start a conversation
        </Text>
      </Box>
      <CreateConversationModal isOpen={modalIsOpen} onClose={onModalClose} />
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          router={router}
          conversationId={conversationId as string}
        />
      ))}
      <Box position="absolute" bottom={0} left={0} width="100%" p={8}>
        <Button width="100%" onClick={() => signOut()}>
          Logout
        </Button>
      </Box>
    </>
  );
};
export default ConversationList;
