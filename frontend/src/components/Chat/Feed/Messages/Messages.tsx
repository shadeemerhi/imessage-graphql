import { useQuery } from "@apollo/client";
import { Flex, Text, Box, Skeleton, Stack, Avatar } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import toast from "react-hot-toast";
import MessageOperations, {
  MessagesData,
  MessagesVariables,
} from "../../../../graphql/operations/messages";

interface MessagesProps {
  conversationId: string;
}

const Messages: React.FC<MessagesProps> = ({ conversationId }) => {
  const { data, loading, error } = useQuery<MessagesData, MessagesVariables>(
    MessageOperations.Query.messages,
    {
      variables: {
        conversationId,
      },
    }
  );

  console.log("MESSAGES DATA", data, loading, error);

  if (error) {
    toast.error("Error fetching messages");
    return null;
  }

  return (
    <Flex direction="column" justify="flex-end">
      {loading && (
        <Stack spacing={4} px={4}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              width="100%"
              height="60px"
              startColor="blackAlpha.400"
              endColor="whiteAlpha.300"
            />
          ))}
        </Stack>
      )}
      {data?.messages && (
        <>
          {data.messages.map((message) => (
            <Stack
              direction="row"
              p={4}
              spacing={4}
              _hover={{ bg: "whiteAlpha.200" }}
            >
              <Avatar />
              <Stack>
                <Stack direction="row" align="center" spacing={4}>
                  <Text fontWeight={600}>{message.sender.username}</Text>
                  <Text fontSize={14} color="whiteAlpha.700">
                    {moment().calendar(message.createdAt, {
                      sameDay: `[Today at] ${moment(message.createdAt).format(
                        "LT"
                      )}`,
                      nextDay: "[Tomorrow]",
                      nextWeek: "dddd",
                      lastDay: "[Yesterday at]",
                      lastWeek: "[Last] dddd",
                      sameElse: "DD/MM/YYYY",
                    })}
                  </Text>
                </Stack>
                <Text>{message.body}</Text>
              </Stack>
            </Stack>
          ))}
        </>
      )}
    </Flex>
  );
};
export default Messages;
