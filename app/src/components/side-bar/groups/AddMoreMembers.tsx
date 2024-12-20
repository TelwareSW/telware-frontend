import { useDispatch } from "react-redux";
import styled from "styled-components";

import AddMembers from "./AddMembers";

import { useGroupInfo } from "@features/groups/hooks/useGroupInfo";

import { sideBarPages } from "types/sideBar";
import { updateSideBarView } from "@state/side-bar/sideBar";
import AddMembersButton from "./AddMembersButton";
import { useAllUsers } from "@features/groups/hooks/useAllUsers";
import { useAppSelector } from "@hooks/useGlobalState";
import { useSocket } from "@hooks/useSocket";
import { useParams } from "react-router-dom";
import { clearSelectedUsers } from "@state/groups/selectedUsers";

const Container = styled.div`
  width: 100%;
  background-color: var(--color-background);
`;

function AddMoreMembers() {
  const { chatId } = useParams<{ chatId: string }>();

  const {
    groupMembers,
    isPending: isPendingGroupMembers,
    chatType,
  } = useGroupInfo();
  const { users, isPending: isPendenigAllUsers } = useAllUsers();
  const selectedUsers = useAppSelector((state) => state.selectedUsers);
  const { addGroupMembers } = useSocket();

  const dispatch = useDispatch();

  if (isPendingGroupMembers || isPendenigAllUsers) return;
  console.log(chatType);

  function handleClick() {
    addGroupMembers({
      chatId: chatId!,
      users: selectedUsers.map((user) => user._id),
    });
    const redirect =
      chatType === "group"
        ? sideBarPages.GROUP_INFO
        : sideBarPages.CHANNEL_INFO;
    dispatch(updateSideBarView({ redirect, data: { type: "right" } }));
    dispatch(clearSelectedUsers());
  }

  const filteredUsers = users?.filter(
    (user) => !groupMembers.some((member) => member._id === user._id)
  );

  return (
    <Container>
      <AddMembers users={filteredUsers!} />
      {!!selectedUsers.length && <AddMembersButton onClick={handleClick} />}
    </Container>
  );
}

export default AddMoreMembers;
