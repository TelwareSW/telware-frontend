import { useState } from "react";
import styled from "styled-components";

import UsersList from "@components/UsersList";
import { UserType } from "@features/groups/hooks/useAllUsers";
import SearchInput from "./SearchInput";

const StyledUsersList = styled.div`
  width: 100%;
  max-height: calc(100vh - 7.5rem);
  overflow-y: scroll;
  position: relative;

  background-color: var(--color-background);
`;

function AddMembers({ users }: { users: UserType[] }) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredUsers = users?.filter((user) =>
    `${user.screenFirstName} ${user.screenLastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SearchInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Add people..."
      />
      <StyledUsersList data-testid="users-container">
        <UsersList
          data-testid="users-list"
          users={filteredUsers!}
          view="update"
        />
      </StyledUsersList>
    </>
  );
}

export default AddMembers;
