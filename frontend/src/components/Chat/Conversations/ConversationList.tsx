import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { ConversationFE, ConversationParticipant } from "../../../util/types";
import ConversationItem from "./ConversationItem";
import CreateConversationModal from "./CreateModal/CreateModal";

interface ConversationListProps {
  userId: string;
  conversations: Array<ConversationFE>;
  onViewConversation: (
    conversationId: string,
    hasSeenLatestMessage: boolean
  ) => void;
  onDeleteConversation: (conversationId: string) => void;
  onLeaveConversation: (conversationId: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  userId,
  conversations,
  onViewConversation,
  onDeleteConversation,
  onLeaveConversation,
}) => {
  const {
    isOpen: modalIsOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const router = useRouter();
  const { conversationId } = router.query;

  const getUserParticipantObject = (conversation: ConversationFE) => {
    return conversation.participants.find(
      (p) => p.user.id === userId
    ) as ConversationParticipant;
  };

  const sorted_conversations = [...conversations].sort(
    (a, b) => b.updatedAt.valueOf() - a.updatedAt.valueOf()
  );

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
      <CreateConversationModal
        isOpen={modalIsOpen}
        onClose={onModalClose}
        userId={userId}
        conversations={conversations}
        onViewConversation={onViewConversation}
        getUserParticipantObject={getUserParticipantObject}
      />
      {sorted_conversations.map((conversation) => {
        const { hasSeenLatestMessage } = getUserParticipantObject(conversation);
        return (
          <ConversationItem
            key={conversation.id}
            userId={userId}
            conversation={conversation}
            hasSeenLatestMessage={hasSeenLatestMessage}
            selectedConversationId={conversationId as string}
            onClick={() =>
              onViewConversation(conversation.id, hasSeenLatestMessage)
            }
            onDeleteConversation={onDeleteConversation}
            onLeaveConversation={onLeaveConversation}
          />
        );
      })}
      <Box position="absolute" bottom={0} left={0} width="100%" p={8}>
        <Button width="100%" onClick={() => signOut()}>
          Logout
        </Button>
      </Box>
    </>
  );
};
export default ConversationList;
