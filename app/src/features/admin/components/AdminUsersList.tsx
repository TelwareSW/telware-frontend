import styled from "styled-components";
import { useEffect, useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { User } from "types/admin";
import Filter from "./Filter";
import UserCard from "./UserCard";

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
  padding: 1.6rem;
`;
function UsersList() {
  const { users: usersData } = useUsers();
  const users = usersData?.data.users;
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
      <StyledUsersList>
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
