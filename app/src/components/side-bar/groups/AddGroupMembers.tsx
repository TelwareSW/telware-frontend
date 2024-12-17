import { useState } from "react";
import styled from "styled-components";

import CircleIcon from "@components/CircleIcon";
import UsersList from "@components/UsersList";

import { sideBarPages } from "types/sideBar";
import { updateSideBarView } from "@state/side-bar/sideBar";

import { useAppDispatch, useAppSelector } from "@hooks/useGlobalState";
import { useAllUsers } from "@features/groups/hooks/useAllUsers";
import { useUser } from "@features/authentication/login/hooks/useUser";
import { useSidebarType } from "../SideBarContext";

const Container = styled.div`
  width: 100%;
  background-color: var(--color-background);
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 0.9rem;
  caret-color: var(--accent-color);
  color: var(--color-text);
  outline: none;
  border: none;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
`;

const StyledUsersList = styled.div`
  width: 100%;
  max-height: calc(100vh - 7.5rem);
  overflow-y: scroll;
  position: relative;

  background-color: var(--color-background);
`;

export default function AddGroupMembers() {
  const sideBarType = useSidebarType();
  const { props } = useAppSelector((state) => state.sideBarData.leftSideBar);

  const type =
    props && "view" in props && typeof props.view === "string"
      ? props.view
      : "";

  console.log(type);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { users, isPending: isPendenigAllUsers } = useAllUsers();
  const { user: currentUser, isPending: isPendingCurrentUser } = useUser();
  const dispatch = useAppDispatch();

  const filteredUsers = users?.filter(
    (user) =>
      user._id !== currentUser._id &&
      `${user.screenFirstName} ${user.screenLastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  if (isPendenigAllUsers || isPendingCurrentUser) return null;

  function handleClick() {
    const redirect =
      type === "channel" ? sideBarPages.NEW_CHANNEL : sideBarPages.NEW_GROUP;
    dispatch(
      updateSideBarView({ redirect, data: { type: sideBarType, view: type } })
    );
  }

  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="Add people..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <StyledUsersList>
        <UsersList users={filteredUsers!} view="update" />
      </StyledUsersList>

      <CircleIcon
        data-testid="confirm-add-members-button"
        $icon="ArrowForward"
        $right={1}
        $bottom={2}
        $size={3.3}
        $padding={0.5}
        $color="white"
        $bgColor="var(--accent-color)"
        $opacity={0.95}
        onClick={handleClick}
      />
    </Container>
  );
}
