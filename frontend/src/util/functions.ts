import { ConversationParticipant } from "./types";

export const formatUsernames = (
  participants: Array<ConversationParticipant>
): string => {
  const usernames = participants.map(
    (participant) => participant.user.username
  );

  return usernames.join(", ");
};
