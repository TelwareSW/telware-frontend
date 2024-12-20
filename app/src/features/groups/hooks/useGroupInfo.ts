import { useAppSelector } from "@hooks/useGlobalState";
import { useParams } from "react-router-dom";
import { useAllUsers, UserType } from "./useAllUsers";
import { useState, useEffect } from "react";
import { useUser } from "@features/authentication/login/hooks/useUser";

function useGroupInfo() {
  const { chatId } = useParams<{ chatId: string }>();
  const [groupMembers, setGroupMembers] = useState<UserType[]>([]);
  const [admins, setAdmins] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCurrUserAdmin, setIsCurrUserAdmin] = useState(false);
  const { user, isPending: isPendingCurrUser } = useUser();

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

      const groupAdmins = members.filter((member) => member.role === "admin");
      setIsCurrUserAdmin(
        members.some(
          (member) => member._id === user._id && member.role === "admin"
        )
      );
      setGroupMembers(members);
      setAdmins(groupAdmins);
      setIsLoading(false);
    }
  }, [group, users, isPending, isPendingCurrUser, user]);

  return {
    groupMembers,
    group,
    isPending: isLoading,
    admins,
    isCurrUserAdmin,
    chatId,
  };
}

export { useGroupInfo };
