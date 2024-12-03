import { useAppSelector } from "@hooks/useGlobalState";
import { Member } from "@mocks/data/chats";

export function useChatMembers(memberIDs?: string[]): Member[] {
  const id = useAppSelector((state) => state.user.userInfo.id);
  const members = useAppSelector((state) => state.chats.members);
  if (!memberIDs || !members) return [];

  return memberIDs
    .filter((memberID) => memberID !== id) // Exclude the specific ID
    .map((filteredID) => members.find((member) => member._id === filteredID))
    .filter((member): member is Member => member !== undefined); // Ensure no undefined values
}
