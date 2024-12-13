import { useAppSelector } from "@hooks/useGlobalState";
import { ChatMember, Member } from "@mocks/data/chats";

export function useChatMembers(memberIDs?: ChatMember[]): Member[] {
  const user = useAppSelector((state) => state.user.userInfo);
  const members = useAppSelector((state) => state.chats.members);
  if (!memberIDs || !members) return [];

  return memberIDs
    .filter((memberID) => memberID._id !== user.id) // Exclude the specific ID
    .map((filteredID) =>
      members.find((member) => member._id === filteredID._id)
    )
    .filter((member): member is Member => member !== undefined); // Ensure no undefined values
}
