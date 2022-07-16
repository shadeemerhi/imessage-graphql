import { useQuery } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import { signOut } from "next-auth/react";
import React from "react";
import toast from "react-hot-toast";
import ConversationOperations, {
  ConversationsData,
} from "../../../graphql/operations/conversations";
import ConversationSearchModal from "./SearchModal";

interface ConversationsProps {
  convId: string;
  setConvId: React.Dispatch<React.SetStateAction<string>>;
}

const testConversations = [
  {
    id: "12345",
    otherPersonName: "Sunny",
    latestMessage: {
      body: "Hey dude lol",
      created_at: Date.now(),
    },
  },
  {
    id: "12345",
    otherPersonName: "Sunny",
    latestMessage: {
      body: "Hey dude lol",
      created_at: Date.now(),
    },
  },
  {
    id: "12345",
    otherPersonName: "Sunny",
    latestMessage: {
      body: "Hey dude lol",
      created_at: Date.now(),
    },
  },
];

const Conversations: React.FC<ConversationsProps> = ({ convId, setConvId }) => {
  const { data, loading, error } = useQuery<ConversationsData, null>(
    ConversationOperations.Queries.conversations
  );
  const {
    isOpen: modalIsOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  console.log("HERE IS CONVERSATION DATA", data, loading, error);

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    toast.error("There was an error fetching conversations");
  }

  return (
    <Stack
      direction="column"
      display={{ base: convId ? "none" : "flex", md: "flex" }}
      width={{ base: "100%", md: "30%" }}
      maxWidth={{ base: "none", md: "360px" }}
      bg="whiteAlpha.50"
      py={6}
      px={3}
      position="relative"
    >
      <Box
        py={2}
        px={4}
        bg="blackAlpha.300"
        borderRadius={4}
        cursor="pointer"
        onClick={onModalOpen}
      >
        <Text color="whiteAlpha.800" fontWeight={500}>
          Find or start a conversation
        </Text>
      </Box>
      <ConversationSearchModal isOpen={modalIsOpen} onClose={onModalClose} />
      {testConversations.map((conversation) => (
        <Stack
          key={conversation.id}
          direction="row"
          spacing={4}
          p={4}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "whiteAlpha.200" }}
          onClick={() => setConvId(conversation.id)}
        >
          <Avatar />
          <Flex justify="space-between" width="100%">
            <Flex direction="column">
              <Text fontWeight={600}>{conversation.otherPersonName}</Text>
              <Text color="whiteAlpha.700">
                {conversation.latestMessage.body}
              </Text>
            </Flex>
            <Text color="whiteAlpha.700">
              {moment(conversation.latestMessage.created_at).format("LT")}
            </Text>
          </Flex>
        </Stack>
      ))}
      <Box position="absolute" bottom={0} left={0} width="100%" p={8}>
        <Button width="100%" onClick={() => signOut()}>
          Logout
        </Button>
      </Box>
    </Stack>
  );
};
export default Conversations;
