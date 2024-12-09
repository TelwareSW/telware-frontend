import { useAllUsers } from "@features/groups/hooks/useAllUsers";
import { useState } from "react";
import styled from "styled-components";
import User from "./User";
import CircleIcon from "./CircleIcon";
import { sideBarPages } from "types/sideBar";
import { updateSideBarView } from "@state/side-bar/sideBar";
import { useDispatch } from "react-redux";

const Container = styled.div`
  width: 100%;

  background-color: var(--color-background);
`;

const StyledUsersList = styled.div`
  width: 100%;
  max-height: calc(100vh - 8.5rem);

  overflow-y: scroll;
  position: relative;
  /* border-top: 0.625rem solid var(--color-background-secondary); */
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

const HorizontalBreak = styled.div`
  &::before {
    content: " ";
    position: absolute;
    /* top: 0; */
    height: 0.5rem;
    inset: 0;
    background-color: var(--color-background-secondary);
  }
`;

function UsersList() {
  const { users, isPending } = useAllUsers();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useDispatch();

  if (isPending) return null;

  const toggleSelectUser = (id: string) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id]
    );
  };

  const filteredUsers = users.filter((user) =>
    user?.username?.toLowerCase().includes(searchQuery.toLowerCase())
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
        {/* <HorizontalBreak /> */}
        {filteredUsers.map((user) => (
          <User
          key={user._id}
          user={user}
          toggleSelectUser={toggleSelectUser}
          selectedUsers={selectedUsers}
          />
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
