import styled from "styled-components";
import Avatar from "./Avatar";
import Checkbox from "./Checkbox";

const UserRow = styled.div`
  display: flex;
  align-items: center;

  padding: 1rem;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
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

export default function User({ user, selectedUsers, toggleSelectUser }) {
  return (
    <UserRow key={user._id}>
      <Checkbox
        checked={selectedUsers.includes(user._id)}
        onChange={() => toggleSelectUser(user._id)}
      />
      <Avatar
        name={user.username}
        src={user.photo || "https://via.placeholder.com/40"}
        alt={user.username}
      />
      <UserDetails>
        <Username>{user.username}</Username>
        <Status>
          {user.status === "offline" ? "Last seen recently" : "Online now"}
        </Status>
      </UserDetails>
    </UserRow>
  );
}
