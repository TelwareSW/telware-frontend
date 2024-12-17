import { useAppSelector } from "@hooks/useGlobalState";
import { useParams } from "react-router-dom";
import { useAllUsers } from "./useAllUsers";
import { useState, useEffect } from "react";

function useGroupInfo() {
  const { chatId } = useParams<{ chatId: string }>();
  const [groupMembers, setGroupMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const group = useAppSelector((state) =>
    state.chats.chats.find((chat) => chat._id === chatId)
  );

  const { users, isPending } = useAllUsers();

  useEffect(() => {
    if (!isPending && group && users?.length) {
      const members = group.members
        .map((groupMember) => {
          const user = users?.find((member) => member._id === groupMember._id);
          return user
            ? {
                ...user,
                role: groupMember.Role,
              }
            : null;
        })
        .filter((member) => member !== null);

      setGroupMembers(members);
      setIsLoading(false);
    }
  }, [group, users, isPending]);

  return { groupMembers, group, isPending: isLoading };
}

export { useGroupInfo };
