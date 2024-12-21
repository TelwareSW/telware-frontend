import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import AddMembers from "./AddMembers";

import { useGroupInfo } from "@features/groups/hooks/useGroupInfo";

import { sideBarPages } from "types/sideBar";
import { updateSideBarView } from "@state/side-bar/sideBar";
import AddMembersButton from "./AddMembersButton";

import { useAppSelector } from "@hooks/useGlobalState";
import { useSocket } from "@hooks/useSocket";
import { clearSelectedUsers } from "@state/groups/selectedUsers";

const Container = styled.div`
  width: 100%;
  background-color: var(--color-background);
`;

function AddMoreMembers() {
  const { chatId } = useParams<{ chatId: string }>();

  const { groupMembers, isPending, chatType } = useGroupInfo();
  const users = useAppSelector((state) => state.chats.members);
  const selectedUsers = useAppSelector((state) => state.selectedUsers);
  const { addGroupMembers } = useSocket();

  const dispatch = useDispatch();

  if (isPending) return;

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
