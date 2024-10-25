import styled from "styled-components";
import { useAppSelector } from "../../hooks";
import ChatsSideBar from "../sideBar/chats/ChatsSideBar";
import SettingsSideBar from "../sideBar/settings/SettingsSideBarBody";
import ContactsSideBar from "../sideBar/ContactsSideBar";
import ProfilePicture from "../sideBar/settings/ProfilePicture";
import { SideBarRowProps } from "../sideBar/settings/SideBarRow";

interface SideBarProps {
  rows?: SideBarRowProps[];
}

const StyledSidebar = styled.aside`
  height: 100vh;
  background-color: var(--color-background);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const sideBarMap: { [key: string]: (props: SideBarProps) => React.ReactNode } =
  {
    Chats: () => <ChatsSideBar />,
    Contacts: () => <ContactsSideBar />,
    Settings: (props) => (
      <SettingsSideBar rows={props.rows || []}>
        <ProfilePicture />
      </SettingsSideBar>
    ),
    Privacy: (props) => <SettingsSideBar rows={props.rows || []} />,
  };
function Sidebar() {
  const { title, props } = useAppSelector((state) => state.sideBarData);
  return <StyledSidebar>{sideBarMap[title](props || {})}</StyledSidebar>;
}

export default Sidebar;
