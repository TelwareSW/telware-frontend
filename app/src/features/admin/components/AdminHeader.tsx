import styled from "styled-components";
import AdminHeaderMenu from "./AdminHeaderMenu";
import AdminNavMenu from "./AdminNavMenu";
import { DESKTOP_VIEW, MOBILE_VIEW } from "@constants";
import Heading from "@components/Heading";
import { useAppSelector } from "@hooks/useGlobalState";
import { useProfileSettings } from "@features/profile-settings/hooks/useProfileSettings";

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: minmax(2.4rem, 20px);
  padding: 1.2rem 2.4rem;
  justify-content: flex-start;
  background-color: var(--admin-header-bg);
  border-bottom: 1px solid var(--scrollbar-color);
  @media ${MOBILE_VIEW} {
    & > :first-child {
      display: block;
    }
  }

  @media ${DESKTOP_VIEW} {
    & > :first-child {
      display: none;
    }
  }
`;
const H4 = styled(Heading)`
  color: var(--color-text);
  flex: 1;
`;

function AdminHeader() {
  const { data: user } = useProfileSettings();
  return (
    <Header>
      <AdminNavMenu />
      <H4 as="h4">Hi, {user?.firstName + " " + user?.lastName} 👋️</H4>
      <AdminHeaderMenu />
    </Header>
  );
}

export default AdminHeader;
