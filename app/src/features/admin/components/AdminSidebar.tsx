import styled from "styled-components";
import Logo from "./Logo";
import AdminMainNav from "./AdminMainNav";
import Heading from "@components/Heading";

const Sidebar = styled.aside`
  gap: 3.2rem;
  display: flex;
  grid-row: 1 / -1;
  flex-direction: column;
  padding: 3.2rem 2.4rem;
  background-color: var(--admin-sidebar-bg);
`;
const H1 = styled(Heading)`
  color: white;
  margin-bottom: 2.4rem;
  text-align: center;
`;

function AdminSidebar() {
  return (
    <Sidebar>
      <Logo />
      <H1 as="h1">TelWare</H1>
      <AdminMainNav />
    </Sidebar>
  );
}

export default AdminSidebar;
