import styled from "styled-components";
import { useAppSelector } from "../hooks";
import ChatsSideBar from "./ChatsSideBar";
import SettingsSideBar from "./SettingsSideBarBody";
import ContactsSideBar from "./ContactsSideBar";
import ProfilePicture from "./ProfilePicture";
import { SideBarRowProps } from "./SideBarRow";

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
      <SettingsSideBar rows={props.rows}>
        <ProfilePicture />
      </SettingsSideBar>
    ),
    Privacy: (props) => <SettingsSideBar rows={props.rows} />,
  };
function Sidebar() {
  const { title, props } = useAppSelector((state) => state.sideBarData);
  return <StyledSidebar>{sideBarMap[title](props || {})}</StyledSidebar>;
}

export default Sidebar;
