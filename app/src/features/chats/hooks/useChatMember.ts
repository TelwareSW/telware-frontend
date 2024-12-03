import { useAppSelector } from "@hooks/useGlobalState";
import { Member } from "@mocks/data/chats";

export function useChatMembers(memberIDs: string[]): Member[] {
  const members = useAppSelector((state) => state.chats.members);
  if (!memberIDs || !members) return [];

  return memberIDs
    .map((id) => members.find((member) => member._id === id))
    .filter((member): member is Member => member !== undefined);
}
