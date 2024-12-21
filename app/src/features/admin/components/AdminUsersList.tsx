import styled from "styled-components";
import { useEffect, useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { User } from "types/admin";
import Filter from "./Filter";
import UserCard from "./UserCard";
import { MOBILE_VIEW, DESKTOP_VIEW } from "@constants";

const userFilters = ["all", "active", "deactivated", "banned"];
const Container = styled.div`
  gap: 3.2rem;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
`;
const StyledUsersList = styled.ul`
  display: grid;
  gap: 1.6rem;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  @media ${MOBILE_VIEW} {
    padding: 0 calc(50% - 10.5rem);
  }
  @media ${DESKTOP_VIEW} {
    padding: 1.6rem;
  }
`;
function UsersList() {
  const { users: usersData } = useUsers();
  const users = usersData?.data.users;
  console.log(users);
  const [renderedUsers, setRenderedUsers] = useState<User[]>(users);
  const [currentFilter, setCurrentFilter] = useState("all");

  useEffect(() => {
    const filteredUsers: User[] =
      currentFilter === "all"
        ? users
        : users?.filter((user: User) => user.accountStatus === currentFilter);
    setRenderedUsers(filteredUsers);
  }, [users, currentFilter]);

  return (
    <Container>
      <Filter
        filters={userFilters}
        onFilterChange={(filter: string) => setCurrentFilter(filter)}
      />
      <StyledUsersList data-testid="users-list">
        {renderedUsers?.map((user: User) => (
          <UserCard
            key={user.id}
            id={user.id}
            userName={user.username}
            photo={user.photo}
            status={user.accountStatus}
          />
        ))}
      </StyledUsersList>
    </Container>
  );
}

export default UsersList;
