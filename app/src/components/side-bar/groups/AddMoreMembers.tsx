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

const Container = styled.div`
  width: 100%;
  background-color: var(--color-background);
`;

function AddMoreMembers() {
  const { chatId } = useParams<{ chatId: string }>();

  const { groupMembers, isPending: isPendingGroupMembers } = useGroupInfo();
  const { users, isPending: isPendenigAllUsers } = useAllUsers();
  const selectedUsers = useAppSelector((state) => state.selectedUsers);
  console.log(selectedUsers);
  const { addGroupMembers } = useSocket();

  const dispatch = useDispatch();

  function handleClick() {
    addGroupMembers({
      chatId: chatId!,
      users: selectedUsers.map((user) => user._id),
    });
    const redirect = sideBarPages.GROUP_INFO;
    dispatch(updateSideBarView({ redirect, data: { type: "right" } }));
  }

  if (isPendingGroupMembers || isPendenigAllUsers) return;

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
