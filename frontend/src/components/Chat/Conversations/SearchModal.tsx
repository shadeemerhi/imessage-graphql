import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import React from "react";

interface ConversationSearchModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const ConversationSearchModal: React.FC<ConversationSearchModal> = ({
  isOpen,
  onOpen,
  onClose,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="whiteAlpha.50" color="whiteAlpha.900">
          <ModalHeader>Find or Create a Conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ConversationSearchModal;
