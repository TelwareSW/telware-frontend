import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useAppSelector } from "../../hooks/useAppState";
import { pagesMap } from "data/sideBar";
import ChatsSideBar from "./chats/ChatsSideBar";
import SettingsSideBar from "./settings/SettingsSideBarBody";
import ContactsSideBar from "./ContactsSideBar";
import ProfilePicture from "./settings/ProfilePicture";
import SettingsUpdate from "./settings/SettingsUpdate";
import { RadioInputProps } from "@components/inputs/RadioInput";
import { SideBarRowProps } from "./settings/SideBarRow";
import ProfileSettings from "@features/profile-settings/ProfileSettings";

interface SideBarProps {
  rows?: SideBarRowProps[];
  data?: RadioInputProps;
}

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateZ(-30px); }
  100% { opacity: 1; transform: translateZ(0); }
`;

const fadeOut = keyframes`
  0% { opacity: 1; transform: translateX(0); }
  100% { opacity: 0; transform: translateX(100px); }
`;

const StyledSidebar = styled.aside<{ $isExiting: boolean }>`
  height: 100vh;
  background-color: var(--color-background);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  animation: ${({ $isExiting }) => ($isExiting ? fadeOut : fadeIn)} 0.1s
    ease-in-out;
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
    SettingsUpdate: (props) => (
      <SettingsSideBar rows={[]}>
        {props.data && <SettingsUpdate {...props.data} />}
      </SettingsSideBar>
    ),
    ProfileUpdate: () => <ProfileSettings />,
  };

function Sidebar() {
  const { page, props } = useAppSelector((state) => state.sideBarData);
  const [currentPage, setCurrentPage] = useState(page);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (currentPage !== page) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setCurrentPage(page);
        setIsExiting(false);
      }, 100);

      return () => clearTimeout(timer);
    } else {
      setCurrentPage(page);
    }
  }, [page, currentPage]);

  const pageString = pagesMap[currentPage];

  return (
    <StyledSidebar $isExiting={isExiting} data-testid="side-bar">
      {sideBarMap[pageString](props || {})}
    </StyledSidebar>
  );
}

export default Sidebar;
