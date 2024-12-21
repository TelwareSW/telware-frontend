import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Avatar from "./Avatar";
import Checkbox from "./Checkbox";
import OptionList from "./OptionList";

import { toggleSelectUser } from "@state/groups/selectedUsers";
import { UserType } from "@features/groups/hooks/useAllUsers";
import { useSocket } from "@hooks/useSocket";
import { useAppDispatch, useAppSelector } from "@hooks/useGlobalState";
import { useGroupInfo } from "@features/groups/hooks/useGroupInfo";
import { getIcon } from "@data/icons";

const UserRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  padding: 1rem;

  &:last-child {
    border-bottom: none;
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

function User({ user, view }: UserProps) {
  const { _id, photo, status, screenFirstName, screenLastName, role } = user;
  const { chatId } = useParams<{ chatId: string }>();
  const { isPending, isCurrUserAdmin } = useGroupInfo();

  const dispatch = useAppDispatch();
  const selectedUsers = useAppSelector((state) => state.selectedUsers);
  const { removeMembers } = useSocket();
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    setIsModalVisible(true);
  }

  function handleToggleMember() {
    if (view === "update") dispatch(toggleSelectUser(user));
  }

  function handleRemoveUser() {
    removeMembers({ chatId: chatId!, members: [_id] });
  }

  function handleCloseModal() {
    setIsModalVisible(false);
  }

  if (isPending) return;

  return (
    <UserRow
      onContextMenu={handleContextMenu}
      onMouseLeave={handleCloseModal}
      data-testid={`user-row-${_id}`}
      onClick={handleToggleMember}
      key={_id}
    >
      {view === "update" && (
        <Checkbox
          data-testid="user-selection-checkbox"
          onChange={handleToggleMember}
          checked={selectedUsers.some(
            (selectedUser) => selectedUser._id === _id
          )}
        />
      )}

      <Avatar
        data-testid={`avatar-user-${_id}`}
        name={screenFirstName}
        image={photo}
      />
      <UserDetails>
        <Details>
          <Username data-testid="user-screen-name">
            {`${screenFirstName} ${screenLastName}`}
          </Username>
          {role === "admin" && <Role data-testid="user-role">{role}</Role>}
        </Details>
        <Status data-testid="user-status">{status}</Status>
      </UserDetails>

      {isModalVisible && isCurrUserAdmin && role !== "admin" && (
        <OptionList onClick={handleRemoveUser}>
          {getIcon("RemoveMember")}
          <p>Remove this user</p>
        </OptionList>
      )}
    </UserRow>
  );
}

export default User;
