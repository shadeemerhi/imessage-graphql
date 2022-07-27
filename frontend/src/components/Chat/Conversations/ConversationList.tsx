import { gql, useMutation } from "@apollo/client";
import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { ConversationFE, ConversationParticipant } from "../../../util/types";
import ConversationItem from "./ConversationItem";
import CreateConversationModal from "./CreateModal/CreateModal";
import ConversationOperations from "../../../graphql/operations/conversations";

interface ConversationListProps {
  userId: string;
  conversations: Array<ConversationFE>;
}

const ConversationList: React.FC<ConversationListProps> = ({
  userId,
  conversations,
}) => {
  const {
    isOpen: modalIsOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const [markConversationAsRead] = useMutation<
    { markConversationAsRead: true },
    { userId: string; conversationId: string }
  >(ConversationOperations.Mutations.markConversationAsRead);

  const router = useRouter();
  const { conversationId } = router.query;

  const onViewConversation = async (conversationId: string) => {
    router.push({ query: { conversationId } });
    try {
      await markConversationAsRead({
        variables: {
          userId,
          conversationId,
        },
        optimisticResponse: {
          markConversationAsRead: true,
        },
        update: (cache) => {
          /**
           * Get conversation participants
           * from cache
           */
          const participantsFragment = cache.readFragment<{
            participants: Array<ConversationParticipant>;
          }>({
            id: `Conversation:${conversationId}`,
            fragment: gql`
              fragment Participants on Conversation {
                participants {
                  user {
                    id
                    username
                  }
                  hasSeenLatestMessage
                }
              }
            `,
          });

          if (!participantsFragment) return;

          /**
           * Create copy to
           * allow mutation
           */
          const participants = [...participantsFragment.participants];

          const userParticipantIdx = participants.findIndex(
            (p) => p.user.id === userId
          );

          /**
           * Should always be found
           * but just in case
           */
          if (userParticipantIdx === -1) return;

          const userParticipant = participants[userParticipantIdx];

          /**
           * Update user to show latest
           * message as read
           */
          participants[userParticipantIdx] = {
            ...userParticipant,
            hasSeenLatestMessage: true,
          };

          /**
           * Update cache
           */
          cache.writeFragment({
            id: `Conversation:${conversationId}`,
            fragment: gql`
              fragment Participants on Conversation {
                participants
              }
            `,
            data: {
              participants,
            },
          });
        },
      });
    } catch (error) {
      console.log("onViewConversation error", error);
    }
  };

  const getUserParticipantObject = (conversation: ConversationFE) => {
    return conversation.participants.find(
      (p) => p.user.id === userId
    ) as ConversationParticipant;
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
          key={conversation.id}
          conversation={conversation}
          hasSeenLatestMessage={
            getUserParticipantObject(conversation).hasSeenLatestMessage
          }
          conversationId={conversationId as string}
          onViewConversation={() => onViewConversation(conversation.id)}
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
