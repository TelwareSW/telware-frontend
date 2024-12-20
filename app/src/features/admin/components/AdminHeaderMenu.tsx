import styled from "styled-components";
import Logout from "@components/Logout";
import ThemeToggle from "@components/side-bar/chats/theme-toggle/ThemeToggle";

const StyledHeaderMenu = styled.ul`
  margin: 0;
  padding: 0;
  gap: 2rem;
  display: flex;
  list-style: none;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  width: 8rem;
`;
const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

function AdminHeaderMenu() {
  return (
    <StyledHeaderMenu data-testid="admin-header-menu">
      <ThemeToggle isAdmin={true} />
      <ListItem>
        <Logout size={2.2} />
      </ListItem>
    </StyledHeaderMenu>
  );
}

export default AdminHeaderMenu;
