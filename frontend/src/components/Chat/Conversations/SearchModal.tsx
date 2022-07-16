import {
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

interface SearchModal {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModal> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="whiteAlpha.50" color="whiteAlpha.900" pb={4}>
          <ModalHeader>Find or Create a Conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={false}>
              <Input id="email" placeholder="Enter a username" />
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default SearchModal;
