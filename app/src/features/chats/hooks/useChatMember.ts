import { useAppSelector } from "@hooks/useGlobalState";
import { Member } from "@mocks/data/chats";

export function useChatMembers(memberIDs?: string[]): Member[] {
  const user = useAppSelector((state) => state.user.userInfo);
  const members = useAppSelector((state) => state.chats.members);
  if (!memberIDs || !members) return [];

  return memberIDs
    .filter((memberID) => memberID !== user.id) // Exclude the specific ID
    .map((filteredID) => members.find((member) => member._id === filteredID))
    .filter((member): member is Member => member !== undefined); // Ensure no undefined values
}
