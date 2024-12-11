import styled from "styled-components";

import Avatar from "./Avatar";
import Checkbox from "./Checkbox";

import { useAppDispatch, useAppSelector } from "@hooks/useGlobalState";

import type { UserType } from "@features/groups/hooks/useAllUsers";
import { toggleSelectUser } from "@state/groups/selectedUsers";

const UserRow = styled.div`
  display: flex;
  align-items: center;

  padding: 1rem;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
  }

  &:hover {
    cursor: pointer;
    background-color: var(--color-background-secondary);
  }
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.span`
  color: var(--color-text);
`;

const Status = styled.span`
  font-size: small;
  color: var(--color-text-secondary);
`;

type UserProps = {
  user: UserType;
  view: "display" | "update";
};

export default function User({ user, view }: UserProps) {
  const { _id, photo, status, screenFirstName, screenLastName } = user;

  const dispatch = useAppDispatch();
  const selectedUsers = useAppSelector((state) => state.selectedUsers);

  function handleToggleMember() {
    if (view === "update") dispatch(toggleSelectUser(user));
  }

  return (
    <UserRow onClick={handleToggleMember} key={_id}>
      {view === "update" && (
        <Checkbox
          checked={selectedUsers.some(
            (selectedUser) => selectedUser._id === _id
          )}
          onChange={handleToggleMember}
        />
      )}

      <Avatar name={screenFirstName} image={photo} />
      <UserDetails>
        <Username>{`${screenFirstName} ${screenLastName}`}</Username>
        <Status>{status}</Status>
      </UserDetails>
    </UserRow>
  );
}