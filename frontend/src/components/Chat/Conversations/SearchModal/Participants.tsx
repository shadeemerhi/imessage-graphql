import { Stack, Button, Box, Text } from "@chakra-ui/react";
import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { UserSearch } from "../../../../graphql/operations/users";

interface ParticipantsProps {
  participants: Array<UserSearch>;
  removeParticipant: (userId: string) => void;
  onCreateConversation: any;
}

const Participants: React.FC<ParticipantsProps> = ({
  participants,
  removeParticipant,
  onCreateConversation,
}) => {
  return (
    <Box mt={8}>
      <Stack direction="row">
        {participants.map((participant) => (
          <Stack
            key={participant.id}
            direction="row"
            align="center"
            bg="whiteAlpha.200"
            borderRadius={4}
            p={2}
          >
            <Text>{participant.username}</Text>
            <IoIosCloseCircleOutline
              size={20}
              cursor="pointer"
              onClick={() => removeParticipant(participant.id)}
            />
          </Stack>
        ))}
      </Stack>
      <Button
        bg="purple.600"
        _hover={{ bg: "purple.600" }}
        width="100%"
        mt={6}
        onClick={onCreateConversation}
      >
        Create Conversation
      </Button>
    </Box>
  );
};
export default Participants;
