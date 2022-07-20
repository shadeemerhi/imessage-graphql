import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import UserOperations, {
  UserSearch,
  UserSearchData,
  UserSearchInput,
} from "../../../../graphql/operations/users";
import ConversationOperations from "../../../../graphql/operations/conversations";
import Participants from "./Participants";
import UserList from "./UserList";

interface SearchModal {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModal> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [participants, setParticipants] = useState<Array<UserSearch>>([]);

  const [searchUsers, { data, loading, error }] = useLazyQuery<
    UserSearchData,
    UserSearchInput
  >(UserOperations.Queries.searchUsers);

  const [
    createConversation,
    {
      data: createConversationData,
      loading: createConversationLoading,
      error: createConversationError,
    },
  ] = useMutation<boolean, { participantIds: Array<string> }>(
    ConversationOperations.Mutations.createConversation
  );

  const onCreateConversation = async () => {
    if (!participants.length) return;

    const participantIds = participants.map((p) => p.id);
    console.log("IDS", participantIds);

    try {
      const { data } = await createConversation({
        variables: {
          participantIds,
        },
      });
      console.log("CREATE CONVERSATION DATA", data);
    } catch (error) {
      console.log("createConversations error", error);
      toast.error("Error creating conversation");
    }
  };

  const onSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchUsers({ variables: { username } });
  };

  const addParticipant = (user: UserSearch) => {
    setParticipants((prev) => [...prev, user]);
  };

  const removeParticipant = (userId: string) => {
    setParticipants((prev) => prev.filter((u) => u.id !== userId));
  };

  if (error) {
    toast.error("Error searching for users");
    return null;
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="whiteAlpha.100" color="whiteAlpha.900" pb={4}>
          <ModalHeader>Find or Create a Conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSearch}>
              <Stack spacing={4}>
                <Input
                  placeholder="Enter a username"
                  onChange={(event) => setUsername(event.target.value)}
                />
                <Button
                  width="100%"
                  type="submit"
                  isLoading={loading}
                  disabled={!username}
                >
                  Search
                </Button>
              </Stack>
            </form>
            {data?.searchUsers && (
              <UserList
                users={data.searchUsers}
                participants={participants}
                addParticipant={addParticipant}
              />
            )}
            {participants.length !== 0 && (
              <Participants
                participants={participants}
                removeParticipant={removeParticipant}
                onCreateConversation={onCreateConversation}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default SearchModal;
