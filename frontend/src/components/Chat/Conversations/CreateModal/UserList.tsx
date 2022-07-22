import { Avatar, Button, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { UserSearch } from "../../../../graphql/operations/users";

interface UserListProps {
  users: Array<UserSearch>;
  participants: Array<UserSearch>;
  addParticipant: (user: UserSearch) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  participants,
  addParticipant,
}) => {
  return (
    <>
      {users.length === 0 ? (
        <Flex mt={6} justify="center">
          <Text>No users found</Text>
        </Flex>
      ) : (
        <Stack mt={6}>
          {users.map((user) => (
            <Stack
              key={user.username}
              direction="row"
              align="center"
              spacing={4}
              py={2}
              px={4}
              cursor="pointer"
              borderRadius={4}
              _hover={{ bg: "whiteAlpha.200" }}
              onClick={() => addParticipant(user)}
            >
              <Avatar />
              <Flex justify="space-between" width="100%">
                <Text color="whiteAlpha.700">{user.username}</Text>
                <Button
                  bg="purple.600"
                  _hover={{ bg: "purple.600" }}
                  disabled={
                    !!participants.find(
                      (participant) => participant.id === user.id
                    )
                  }
                >
                  Select
                </Button>
              </Flex>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
};
export default UserList;
