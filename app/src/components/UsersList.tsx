import { useState } from "react";
import { useAppDispatch } from "@hooks/useGlobalState";
import styled from "styled-components";

import User from "./User";
import CircleIcon from "./CircleIcon";

import { sideBarPages } from "types/sideBar";
import { updateSideBarView } from "@state/side-bar/sideBar";

import { useAllUsers } from "@features/groups/hooks/useAllUsers";

const Container = styled.div`
  width: 100%;
  background-color: var(--color-background);
`;

const StyledUsersList = styled.div`
  width: 100%;
  max-height: calc(100vh - 8.5rem);
  overflow-y: scroll;
  position: relative;
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

function UsersList() {
  const { users, isPending } = useAllUsers();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useAppDispatch();

  if (isPending) return null;

  const filteredUsers = users?.filter((user) =>
    `${user.screenFirstName} ${user.screenLastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="Add people..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <StyledUsersList>
        {filteredUsers?.map((user) => (
          <User key={user._id} user={user} view="update" />
        ))}
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
        onClick={() =>
          dispatch(updateSideBarView({ redirect: sideBarPages.NEW_GROUP }))
        }
      />
    </Container>
  );
}

export default UsersList;
