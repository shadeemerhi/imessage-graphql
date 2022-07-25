import { Stack, Avatar, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { MessageFE } from "../../../../graphql/operations/messages";

interface MessageItemProps {
  message: MessageFE;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  return (
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
  );
};
export default MessageItem;
