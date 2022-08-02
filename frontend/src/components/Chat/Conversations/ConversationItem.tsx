import {
  Avatar,
  Box,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { formatUsernames } from "../../../util/functions";
import { ConversationFE } from "../../../util/types";

interface ConversationItemProps {
  conversation: ConversationFE;
  onClick: () => void;
  hasSeenLatestMessage?: boolean;
  selectedConversationId?: string;
  onDeleteConversation?: (conversationId: string) => void;
  onLeaveConversation?: (conversationId: string) => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  selectedConversationId,
  hasSeenLatestMessage,
  onClick,
  onDeleteConversation,
  onLeaveConversation,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    if (event.type === "click") {
      onClick();
    } else if (event.type === "contextmenu") {
      event.preventDefault();
      setMenuOpen(true);
    }
  };

  return (
    <>
      <Stack
        direction="row"
        align="center"
        justify="space-between"
        p={4}
        cursor="pointer"
        borderRadius={4}
        bg={
          conversation.id === selectedConversationId ? "whiteAlpha.200" : "none"
        }
        _hover={{ bg: "whiteAlpha.200" }}
        onClick={handleClick}
        onContextMenu={handleClick}
        position="relative"
      >
        {onLeaveConversation && onDeleteConversation && (
          <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} isLazy>
            <MenuList>
              {conversation.participants.length > 2 ? (
                <MenuItem onClick={() => onLeaveConversation(conversation.id)}>
                  Leave
                </MenuItem>
              ) : (
                <MenuItem onClick={() => onDeleteConversation(conversation.id)}>
                  Delete
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        )}
        <Flex position="absolute" left="4px">
          {hasSeenLatestMessage === false && (
            <GoPrimitiveDot fontSize={18} color="#6B46C1" />
          )}
        </Flex>
        <Avatar />
        <Flex justify="space-between" width="80%">
          <Flex direction="column" width="70%">
            <Text
              fontWeight={600}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {formatUsernames(conversation.participants)}
            </Text>
            {conversation.latestMessage && (
              <Box>
                <Text
                  color="whiteAlpha.700"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {conversation.latestMessage.body}
                </Text>
              </Box>
            )}
          </Flex>
          <Text color="whiteAlpha.700" textAlign="right">
            {moment(conversation.updatedAt).format("LT")}
          </Text>
        </Flex>
      </Stack>
    </>
  );
};
export default ConversationItem;
