import { useQuery } from "@apollo/client";
import { Flex, Text, Box, Skeleton, Stack, Avatar } from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import MessageOperations, {
  MessagesData,
  MessagesSubscriptionData,
  MessagesVariables,
} from "../../../../graphql/operations/messages";

interface MessagesProps {
  userId: string;
  conversationId: string;
}

const Messages: React.FC<MessagesProps> = ({ userId, conversationId }) => {
  const { data, loading, error, subscribeToMore } = useQuery<
    MessagesData,
    MessagesVariables
  >(MessageOperations.Query.messages, {
    variables: {
      conversationId,
    },
  });

  const subscribeToMoreMessages = () => {
    subscribeToMore({
      document: MessageOperations.Subscriptions.messageSent,
      variables: {
        conversationId,
      },
      updateQuery: (prev, { subscriptionData }: MessagesSubscriptionData) => {
        if (!subscriptionData.data) return prev;

        console.log("SUBSCRIPTION DATA", subscriptionData, userId);

        const newMessage = subscriptionData.data.messageSent;

        // return prev;
        return Object.assign({}, prev, {
          messages:
            newMessage.sender.id === userId
              ? prev.messages
              : [newMessage, ...prev.messages],
        });
      },
    });
  };

  useEffect(() => {
    subscribeToMoreMessages();
  }, []);

  if (error) {
    toast.error("Error fetching messages");
    return null;
  }

  return (
    <Flex direction="column" justify="flex-end" overflow="hidden">
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
        <Flex direction="column-reverse" overflow="scroll" height="100%">
          {data.messages.map((message) => (
            <Stack
              key={message.id}
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
                    {moment(message.createdAt).format("LT")}
                    {/* DATE NOT WORKING PROPERLY */}
                    {/* {moment().calendar(message.createdAt, {
                      sameDay: `[Today at] ${moment(message.createdAt).format(
                        "LT"
                      )}`,
                      nextDay: "[Tomorrow]",
                      nextWeek: "dddd",
                      lastDay: "[Yesterday at]",
                      lastWeek: "[Last] dddd",
                      sameElse: "DD/MM/YYYY",
                    })} */}
                  </Text>
                </Stack>
                <Text>{message.body}</Text>
              </Stack>
            </Stack>
          ))}
        </Flex>
      )}
    </Flex>
  );
};
export default Messages;
