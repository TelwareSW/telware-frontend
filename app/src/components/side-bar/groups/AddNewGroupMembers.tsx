import styled from "styled-components";

import AddMembers from "./AddMembers";

import { sideBarPages } from "types/sideBar";
import { updateSideBarView } from "@state/side-bar/sideBar";

import { useSidebarType } from "../SideBarContext";
import { useAllUsers } from "@features/groups/hooks/useAllUsers";
import { useUser } from "@features/authentication/login/hooks/useUser";
import { useAppDispatch, useAppSelector } from "@hooks/useGlobalState";
import AddMembersButton from "./AddMembersButton";

const Container = styled.div`
  width: 100%;
  background-color: var(--color-background);
`;

function AddNewGroupMembers() {
  const sideBarType = useSidebarType();
  const { props } = useAppSelector((state) =>
    sideBarType === "left"
      ? state.sideBarData.leftSideBar
      : state.sideBarData.rightSideBar
  );

  const type = props?.view;

  const { users, isPending: isPendenigAllUsers } = useAllUsers();
  const { user: currentUser, isPending: isPendingCurrentUser } = useUser();
  const dispatch = useAppDispatch();

  if (isPendenigAllUsers || isPendingCurrentUser) return null;

  const filteredUsers = users?.filter((user) => user._id !== currentUser._id);

  function handleClick() {
    const redirect =
      type === "channel" ? sideBarPages.NEW_CHANNEL : sideBarPages.NEW_GROUP;
    dispatch(updateSideBarView({ redirect, data: { type: sideBarType } }));
  }

  return (
    <Container>
      <AddMembers users={filteredUsers!} />
      <AddMembersButton onClick={handleClick} />
    </Container>
  );
}

export default AddNewGroupMembers;
