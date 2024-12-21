import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import styled from "styled-components";
import { DESKTOP_VIEW, MOBILE_VIEW } from "@constants";
import { useAppSelector } from "@hooks/useGlobalState";
import { View } from "@state/admin/adminView";
import UsersList from "./AdminUsersList";
import GroupsList from "./AdminGroupsList";

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
  background-color: var(--admin-header-bg);
  &::-webkit-scrollbar {
    display: block;
    width: 0.6rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-color);
    border-radius: 0.4rem;
  }
`;

function AdminAppLayout() {
  const adminView = useAppSelector((state) => state.adminView.value);
  return (
    <StyledAppLayout>
      <AdminHeader />
      <AdminSidebar />
      <Main>{adminView === View.USERS ? <UsersList /> : <GroupsList />}</Main>
    </StyledAppLayout>
  );
}

export default AdminAppLayout;
