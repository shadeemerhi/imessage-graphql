import {
  Stack,
  Avatar,
  Flex,
  Button,
  useDisclosure,
  Box,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import {
  ConversationFE,
  ConversationParticipant,
} from "../../../graphql/operations/conversations";
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

  const formatUsernames = (
    participants: Array<ConversationParticipant>
  ): string => {
    const usernames = participants.map(
      (participant) => participant.user.username
    );

    return usernames.join(", ");
  };

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
