import UsersList from "@components/UsersList";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;

export default function AddGroupMembers() {
  return (
    <Container>
      <UsersList />
    </Container>
  );
}
