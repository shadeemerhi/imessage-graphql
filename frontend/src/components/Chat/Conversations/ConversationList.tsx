import { useMutation } from "@apollo/client";
import { Box, Button, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ConversationOperations from "../../../graphql/operations/conversations";
import {
  ConversationFE,
  ConversationParticipant,
  ConversationsData,
} from "../../../util/types";
import ConversationItem from "./ConversationItem";
import ConversationModal from "./Modal/Modal";

interface ConversationListProps {
  session: Session;
  conversations: Array<ConversationFE>;
  onViewConversation: (
    conversationId: string,
    hasSeenLatestMessage: boolean
  ) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  session,
  conversations,
  onViewConversation,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingConversation, setEditingConversation] =
    useState<ConversationFE | null>(null);
  const router = useRouter();
  const { conversationId } = router.query;
  const {
    user: { id: userId },
  } = session;

  /**
   * Mutations
   */
  const [updateParticipants, { loading: updateParticipantsLoading }] =
    useMutation<
      { updateParticipants: boolean },
      { conversationId: string; participantIds: Array<string> }
    >(ConversationOperations.Mutations.updateParticipants);

  const [deleteConversation] = useMutation<
    { deleteConversation: boolean },
    { conversationId: string }
  >(ConversationOperations.Mutations.deleteConversation);

  const onLeaveConversation = async (conversation: ConversationFE) => {
    const participantIds = conversation.participants
      .filter((p) => p.user.id !== userId)
      .map((p) => p.user.id);

    try {
      const { data, errors } = await updateParticipants({
        variables: {
          conversationId: conversation.id,
          participantIds,
        },
        optimisticResponse: {
          updateParticipants: true,
        },
        update: (cache) => {
          const existing = cache.readQuery<ConversationsData>({
            query: ConversationOperations.Queries.conversations,
          });

          if (!existing) return;

          cache.writeQuery<ConversationsData, null>({
            query: ConversationOperations.Queries.conversations,
            data: {
              conversations: existing.conversations.filter(
                (c) => c.id !== conversation.id
              ),
            },
          });

          /**
           * Only redirect if user leaves conversation
           * they are currently viewing
           */
          if (conversationId === conversation.id) {
            router.replace(process.env.NEXT_PUBLIC_BASE_URL as string);
          }
        },
      });

      if (!data || errors) {
        throw new Error("Failed to update participants");
      }
    } catch (error: any) {
      console.log("onUpdateConversation error", error);
      toast.error(error?.message);
    }
  };

  const onDeleteConversation = async (conversationId: string) => {
    try {
      toast.promise(
        deleteConversation({
          variables: {
            conversationId,
          },
          update: () => {
            router.replace(process.env.NEXT_PUBLIC_BASE_URL as string);
          },
        }),
        {
          loading: "Deleting conversation",
          success: "Conversation deleted",
          error: "Failed to delete conversation",
        }
      );
    } catch (error) {
      console.log("onDeleteConversation error", error);
    }
  };

  const getUserParticipantObject = (conversation: ConversationFE) => {
    return conversation.participants.find(
      (p) => p.user.id === session.user.id
    ) as ConversationParticipant;
  };

  const onEditConversation = (conversation: ConversationFE) => {
    setEditingConversation(conversation);
    openModal();
  };

  const openModal = () => setModalOpen(true);

  const closeModal = () => {
    setEditingConversation(null);
    setModalOpen(false);
  };

  const sortedConversations = [...conversations].sort(
    (a, b) => b.updatedAt.valueOf() - a.updatedAt.valueOf()
  );

  return (
    <Box width={{ base: "100%", md: "360px" }}>
      <Box
        py={2}
        px={4}
        mb={4}
        bg="blackAlpha.300"
        borderRadius={4}
        cursor="pointer"
        onClick={openModal}
      >
        <Text color="whiteAlpha.800" fontWeight={500}>
          Find or start a conversation
        </Text>
      </Box>
      <ConversationModal
        isOpen={modalOpen}
        onClose={closeModal}
        session={session}
        conversations={conversations}
        editingConversation={editingConversation}
        onViewConversation={onViewConversation}
        getUserParticipantObject={getUserParticipantObject}
      />
      {sortedConversations.map((conversation) => {
        const { hasSeenLatestMessage } = getUserParticipantObject(conversation);
        return (
          <ConversationItem
            key={conversation.id}
            userId={session.user.id}
            conversation={conversation}
            hasSeenLatestMessage={hasSeenLatestMessage}
            selectedConversationId={conversationId as string}
            onClick={() =>
              onViewConversation(conversation.id, hasSeenLatestMessage)
            }
            onEditConversation={() => onEditConversation(conversation)}
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
    </Box>
  );
};
export default ConversationList;
