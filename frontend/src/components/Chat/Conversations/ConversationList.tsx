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
import React from "react";
import { ConversationFE } from "../../../graphql/operations/conversations";
import ConversationSearchModal from "./SearchModal";

type ConversationListProps = {
  conversations: Array<ConversationFE>;
  setConvId: React.Dispatch<React.SetStateAction<string>>;
};

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  setConvId,
}) => {
  const {
    isOpen: modalIsOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  return (
    <>
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
      {conversations.map((conversation) => (
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
              <Text fontWeight={600}>Sunny</Text>
              <Text color="whiteAlpha.700">
                {conversation.latestMessage.body}
              </Text>
            </Flex>
            <Text color="whiteAlpha.700">
              {moment(Date.now()).format("LT")}
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
