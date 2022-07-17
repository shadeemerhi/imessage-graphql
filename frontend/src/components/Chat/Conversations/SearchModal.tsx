import { useLazyQuery } from "@apollo/client";
import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import UserOperations, {
  UserSearchData,
  UserSearchInput,
} from "../../../graphql/operations/users";

interface SearchModal {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModal> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");

  const [searchUsers, { data, loading, error }] = useLazyQuery<
    UserSearchData,
    UserSearchInput
  >(UserOperations.Queries.searchUsers);

  console.log("HERE IS DATA", data);

  if (error) {
    console.log("HERE IS ERROR", error);
    toast.error("Error searching for users");
    return null;
  }

  const onSearch = () => {
    console.log("SEARCHING", username);

    searchUsers({ variables: { username } });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="whiteAlpha.50" color="whiteAlpha.900" pb={4}>
          <ModalHeader>Find or Create a Conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={false}>
              <Input
                placeholder="Enter a username"
                onChange={(event) => setUsername(event.target.value)}
              />
              <Button onClick={onSearch} isLoading={loading}>
                Search
              </Button>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default SearchModal;
