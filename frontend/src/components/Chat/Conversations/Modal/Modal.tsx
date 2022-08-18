import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Box,
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
import { Session } from "next-auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  ConversationPopulated,
  ParticipantPopulated,
} from "../../../../../../backend/src/util/types";
import ConversationOperations from "../../../../graphql/operations/conversations";
import UserOperations from "../../../../graphql/operations/users";
import {
  CreateConversationData,
  SearchedUser,
  SearchUsersData,
  SearchUsersInputs,
} from "../../../../util/types";
import ConversationItem from "../ConversationItem";
import Participants from "./Participants";
import UserList from "./UserList";

interface ConversationModal {
  isOpen: boolean;
  onClose: () => void;
  session: Session;
  conversations: Array<ConversationPopulated>;
  editingConversation: ConversationPopulated | null;
  onViewConversation: (
    conversationId: string,
    hasSeenLatestMessage: boolean
  ) => void;
  getUserParticipantObject: (
    conversation: ConversationPopulated
  ) => ParticipantPopulated;
}

const ConversationModal: React.FC<ConversationModal> = ({
  isOpen,
  onClose,
  session,
  conversations,
  editingConversation,
  onViewConversation,
  getUserParticipantObject,
}) => {
  const [username, setUsername] = useState("");
  const [participants, setParticipants] = useState<Array<SearchedUser>>([]);

  const [existingConversation, setExistingConversation] =
    useState<ConversationPopulated | null>(null);

  const router = useRouter();
  const {
    user: { id: userId },
  } = session;

  const [
    searchUsers,
    {
      data: searchUsersData,
      loading: searchUsersLoading,
      error: searchUsersError,
    },
  ] = useLazyQuery<SearchUsersData, SearchUsersInputs>(
    UserOperations.Queries.searchUsers
  );

  const [createConversation, { loading: createConversationLoading }] =
    useMutation<CreateConversationData, { participantIds: Array<string> }>(
      ConversationOperations.Mutations.createConversation
    );

  const [updateParticipants, { loading: updateParticipantsLoading }] =
    useMutation<
      { updateParticipants: boolean },
      { conversationId: string; participantIds: Array<string> }
    >(ConversationOperations.Mutations.updateParticipants);

  const onSubmit = () => {
    if (!participants.length) return;

    const participantIds = participants.map((p) => p.id);

    const existing = findExistingConversation(participantIds);

    if (existing) {
      toast("Conversation already exists");
      setExistingConversation(existing);
      return;
    }

    /**
     * Determine which function to call
     */
    editingConversation
      ? onUpdateConversation(editingConversation)
      : onCreateConversation();
  };

  /**
   * Verifies that a conversation with selected
   * participants does not already exist
   */
  const findExistingConversation = (participantIds: Array<string>) => {
    let existingConversation: ConversationPopulated | null = null;

    for (const conversation of conversations) {
      const addedParticipants = conversation.participants.filter(
        (p) => p.user.id !== userId
      );

      if (addedParticipants.length !== participantIds.length) {
        continue;
      }

      let allMatchingParticipants: boolean = false;
      for (const participant of addedParticipants) {
        const foundParticipant = participantIds.find(
          (p) => p === participant.user.id
        );

        if (!foundParticipant) {
          allMatchingParticipants = false;
          break;
        }

        /**
         * If we hit here,
         * all match
         */
        allMatchingParticipants = true;
      }

      if (allMatchingParticipants) {
        existingConversation = conversation;
      }
    }

    return existingConversation;
  };

  const onCreateConversation = async () => {
    const participantIds = [userId, ...participants.map((p) => p.id)];

    try {
      const { data, errors } = await createConversation({
        variables: {
          participantIds,
        },
      });
      if (!data?.createConversation || errors) {
        throw new Error("Failed to create conversation");
      }
      const {
        createConversation: { conversationId },
      } = data;
      router.push({ query: { conversationId } });

      /**
       * Clear state and close modal
       * on successful creation
       */
      setParticipants([]);
      setUsername("");
      onClose();
    } catch (error: any) {
      console.log("createConversations error", error);
      toast.error(error?.message);
    }
  };

  const onUpdateConversation = async (conversation: ConversationPopulated) => {
    const participantIds = participants.map((p) => p.id);

    try {
      const { data, errors } = await updateParticipants({
        variables: {
          conversationId: conversation.id,
          participantIds,
        },
      });

      if (!data?.updateParticipants || errors) {
        throw new Error("Failed to update participants");
      }

      /**
       * Clear state and close modal
       * on successful update
       */
      setParticipants([]);
      setUsername("");
      onClose();
    } catch (error) {
      console.log("onUpdateConversation error", error);
      toast.error("Failed to update participants");
    }
  };

  const onSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchUsers({ variables: { username } });
  };

  const addParticipant = (user: SearchedUser) => {
    setParticipants((prev) => [...prev, user]);
    setUsername("");
  };

  const removeParticipant = (userId: string) => {
    setParticipants((prev) => prev.filter((u) => u.id !== userId));
  };

  const onConversationClick = () => {
    if (!existingConversation) return;

    const { hasSeenLatestMessage } =
      getUserParticipantObject(existingConversation);

    onViewConversation(existingConversation.id, hasSeenLatestMessage);
    onClose();
  };

  /**
   * If a conversation is being edited,
   * update participant state to be that
   * conversations' participants
   */
  useEffect(() => {
    if (editingConversation) {
      setParticipants(
        editingConversation.participants.map((p) => p.user as SearchedUser)
      );
      return;
    }
  }, [editingConversation]);

  /**
   * Reset existing conversation state
   * when participants added/removed
   */
  useEffect(() => {
    setExistingConversation(null);
  }, [participants]);

  /**
   * Clear participant state if closed
   */
  useEffect(() => {
    if (!isOpen) {
      setParticipants([]);
    }
  }, [isOpen]);

  if (searchUsersError) {
    toast.error("Error searching for users");
    return null;
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", md: "md" }}>
        <ModalOverlay />
        <ModalContent bg="#2d2d2d" pb={4}>
          <ModalHeader>Find or Create a Conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSearch}>
              <Stack spacing={4}>
                <Input
                  placeholder="Enter a username"
                  onChange={(event) => setUsername(event.target.value)}
                  value={username}
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
                  participants={participants.filter((p) => p.id !== userId)}
                  removeParticipant={removeParticipant}
                />
                <Box mt={4}>
                  {existingConversation && (
                    <ConversationItem
                      userId={userId}
                      conversation={existingConversation}
                      onClick={() => onConversationClick()}
                    />
                  )}
                </Box>
                <Button
                  bg="brand.100"
                  _hover={{ bg: "brand.100" }}
                  width="100%"
                  mt={6}
                  disabled={!!existingConversation}
                  isLoading={
                    createConversationLoading || updateParticipantsLoading
                  }
                  onClick={onSubmit}
                >
                  {editingConversation
                    ? "Update Conversation"
                    : "Create Conversation"}
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ConversationModal;
