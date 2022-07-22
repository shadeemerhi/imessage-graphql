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
import ConversationOperations, {
  CreateConversationData,
} from "../../../../graphql/operations/conversations";
import Participants from "./Participants";
import UserList from "./UserList";

interface CreateConversationModal {
  isOpen: boolean;
  onClose: () => void;
  setSelectedConversationId: React.Dispatch<React.SetStateAction<string>>;
}

const CreateConversationModal: React.FC<CreateConversationModal> = ({
  isOpen,
  onClose,
  setSelectedConversationId,
}) => {
  const [username, setUsername] = useState("");
  const [participants, setParticipants] = useState<Array<UserSearch>>([]);

  const [
    searchUsers,
    {
      data: searchUsersData,
      loading: searchUsersLoading,
      error: searchUsersError,
    },
  ] = useLazyQuery<UserSearchData, UserSearchInput>(
    UserOperations.Queries.searchUsers
  );

  const [createConversation, { loading: createConversationLoading }] =
    useMutation<CreateConversationData, { participantIds: Array<string> }>(
      ConversationOperations.Mutations.createConversation
    );

  const onCreateConversation = async () => {
    if (!participants.length) return;

    const participantIds = participants.map((p) => p.id);

    try {
      const { data, errors } = await createConversation({
        variables: {
          participantIds,
        },
      });

      if (!data?.createConversation || errors) {
        throw new Error("Error creating conversation");
      }

      const {
        createConversation: { conversationId },
      } = data;

      setSelectedConversationId(conversationId);

      /**
       * Close modal on successful creation
       */
      onClose();
    } catch (error: any) {
      console.log("createConversations error", error);
      toast.error(error?.message);
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

  if (searchUsersError) {
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
                  isLoading={searchUsersLoading}
                  disabled={!username}
                >
                  Search
                </Button>
              </Stack>
            </form>
            {searchUsersData?.searchUsers && (
              <UserList
                users={searchUsersData.searchUsers}
                participants={participants}
                addParticipant={addParticipant}
              />
            )}
            {participants.length !== 0 && (
              <>
                <Participants
                  participants={participants}
                  removeParticipant={removeParticipant}
                />
                <Button
                  bg="purple.600"
                  _hover={{ bg: "purple.600" }}
                  width="100%"
                  mt={6}
                  isLoading={createConversationLoading}
                  onClick={onCreateConversation}
                >
                  Create Conversation
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateConversationModal;
