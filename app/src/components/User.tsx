import styled from "styled-components";

import Avatar from "./Avatar";
import Checkbox from "./Checkbox";

import { useAppDispatch, useAppSelector } from "@hooks/useGlobalState";

import { toggleSelectUser } from "@state/groups/selectedUsers";
import { UserType } from "@features/groups/hooks/useAllUsers";

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

  width: 100%;
  overflow: hidden;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  overflow: hidden;
`;

const Username = styled.span`
  color: var(--color-text);

  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
`;

const Status = styled.span`
  font-size: small;
  color: var(--color-text-secondary);
`;

const Role = styled.span`
  color: var(--color-text-secondary);
  font-size: small;

  flex-shrink: 0;
  margin-left: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

type UserProps = {
  user: UserType;
  view: "display" | "update";
};

export default function User({ user, view }: UserProps) {
  const { _id, photo, status, screenFirstName, screenLastName, role } = user;

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
        <Details>
          <Username>{`${screenFirstName} ${screenLastName}`}</Username>
          {role === "admin" && <Role>{role}</Role>}
        </Details>
        <Status>{status}</Status>
      </UserDetails>
    </UserRow>
  );
}
