import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import styled from "styled-components";
import { DESKTOP_VIEW, MOBILE_VIEW } from "@constants";

const StyledAppLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: auto 1fr;
  overflow-x: auto;
  @media ${MOBILE_VIEW} {
    grid-template-columns: 1fr;
    & > main {
      padding: 0;
    }
    & > aside {
      display: none;
    }
  }

  @media ${DESKTOP_VIEW} {
    display: grid;
    grid-template-columns: minmax(20rem, 1.3fr) 5fr;

    & > main {
      display: block;
    }

    & > aside {
      display: block;
    }
  }
`;

const Main = styled.main`
  overflow-y: auto;
  padding: 4rem 2.4rem;
  background-color: var(--admin-main-bg);
`;

const Container = styled.div`
  gap: 3.2rem;
  display: flex;
  margin: 0 auto;
  max-width: 120rem;
  flex-direction: column;
`;

function AdminAppLayout() {
  return (
    <StyledAppLayout>
      <AdminHeader />
      <AdminSidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AdminAppLayout;
