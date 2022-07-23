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
        <Stack
          key={conversation.id}
          direction="row"
          spacing={4}
          p={4}
          cursor="pointer"
          borderRadius={4}
          bg={conversation.id === conversationId ? "whiteAlpha.200" : "none"}
          _hover={{ bg: "whiteAlpha.200" }}
          onClick={() =>
            router.push({ query: { conversationId: conversation.id } })
          }
        >
          <Avatar />
          <Flex justify="space-between" width="80%">
            <Flex direction="column" width="70%">
              <Text
                fontWeight={600}
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {formatUsernames(conversation.participants)}
              </Text>
              {conversation.latestMessage && (
                <Text color="whiteAlpha.700">
                  {conversation.latestMessage.body}
                </Text>
              )}
            </Flex>
            <Text color="whiteAlpha.700">
              {moment(conversation.updatedAt).format("LT")}
            </Text>
          </Flex>
        </Stack>
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
