import { useAppSelector } from "@hooks/useGlobalState";
import { useParams } from "react-router-dom";
import { UserType } from "./useAllUsers";
import { useState, useEffect } from "react";

function useGroupInfo() {
  const { chatId } = useParams<{ chatId: string }>();
  const [groupMembers, setGroupMembers] = useState<UserType[]>([]);
  const [admins, setAdmins] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCurrUserAdmin, setIsCurrUserAdmin] = useState(false);

  const { chats, members: users } = useAppSelector((state) => state.chats);
  const user = useAppSelector((state) => state.user.userInfo);

  const group = chats.find((chat) => chat._id === chatId);

  useEffect(() => {
    if (users?.length) {
      const members = group?.members
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


      const groupAdmins = members?.filter((member) => member.role === "admin");
      setIsCurrUserAdmin(
        members?.some(
          (member) => member._id === user.id && member.role === "admin"
        ) || false
      );
      setGroupMembers(members!);
      setAdmins(groupAdmins!);
      setIsLoading(false);
    }
  }, [group, users, user, isLoading]);

  return {
    groupMembers,
    group,
    isPending: isLoading,
    admins,
    isCurrUserAdmin,
    chatId,
    chatType: group?.type,
  };
}

export { useGroupInfo };
