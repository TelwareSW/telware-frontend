import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import { pagesMap } from "@data/sideBar";

import ChatsSideBar from "./chats/ChatsSideBar";
import SettingsSideBar from "./settings/SettingsSideBarBody";
import ContactsSideBar from "./ContactsSideBar";
import ProfilePicture from "./settings/ProfilePicture";
import SettingsUpdate from "./settings/SettingsUpdate";
import { RadioInputProps } from "@components/inputs/radio-input/RadioInput";
import { SideBarRowProps } from "./settings/side-bar-row/SideBarRow";
import ProfileSettings from "@features/profile-settings/ProfileSettings";
import ProfileInfo from "@features/profile-info/ProfileInfo";
import ChatList from "@features/chats/ChatsList";
import AddGroupMembers from "./groups/AddGroupMembers.js";

import { useAppSelector } from "@hooks/useGlobalState";
import BlockList from "@features/privacy-settings/BlockList";
import Devices from "@features/devices/Devices";
import NewGroup from "@features/groups/NewGroup.js";
import { SidebarContext } from "./SideBarContext.js";
import GroupInfo from "@features/groups/GroupInfo.js";
import EditGroupInfo from "@features/groups/EditGroupInfo.js";

interface SideBarProps {
  rows?: SideBarRowProps[];
  data?: RadioInputProps;
  type?: "channel" | "group";
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
  height: 100dvh;
  background-color: var(--color-background);
  overflow: hidden;
  position: relative;

  display: flex;
  flex-direction: column;

  border-right: 1px solid var(--color-border);
  z-index: 100;

  animation: ${({ $isExiting }) => ($isExiting ? fadeOut : fadeIn)} 0.1s;
  animation: ${({ $isExiting }) => ($isExiting ? fadeOut : fadeIn)} 0.1s
    ease-in-out;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: inherit;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--scrollbar-color);
    border-radius: 5px;
  }
`;

const sideBarMap: {
  [key: string]: (
    props: SideBarProps,
    type: "left" | "right"
  ) => React.ReactNode;
} = {
  Chats: () => (
    <ChatsSideBar>
      <ChatList />
    </ChatsSideBar>
  ),
  Contacts: () => <ContactsSideBar />,
  Settings: (props) => (
    <SettingsSideBar rows={props.rows || []}>
      <ProfilePicture />
      <ProfileInfo />
    </SettingsSideBar>
  ),
  Privacy: (props) => <SettingsSideBar rows={props.rows || []} />,
  SettingsUpdate: (props) => (
    <SettingsSideBar rows={[]}>
      {props.data && <SettingsUpdate {...props.data} />}
    </SettingsSideBar>
  ),
  ProfileUpdate: () => <ProfileSettings />,
  blockList: () => (
    <SettingsSideBar rows={[]}>
      <BlockList />
    </SettingsSideBar>
  ),
  Devices: () => <SettingsSideBar rows={[]} children={<Devices />} />,
  AddMembers: (props) => (
    <SettingsSideBar rows={[]}>
      <AddGroupMembers type={props.data?.type!} />
    </SettingsSideBar>
  ),
  NewGroup: () => (
    <SettingsSideBar rows={[]}>
      <NewGroup type="group" />
    </SettingsSideBar>
  ),
  NewChannel: () => (
    <SettingsSideBar rows={[]}>
      <NewGroup type="channel" />
    </SettingsSideBar>
  ),
  GroupInfo: () => (
    <SettingsSideBar rows={[]}>
      <GroupInfo />
    </SettingsSideBar>
  ),
  EditGroupInfo: () => (
    <SettingsSideBar rows={[]}>
      <EditGroupInfo />
    </SettingsSideBar>
  ),
};

function Sidebar({ type }: { type: "left" | "right" }) {
  const { page, props } = useAppSelector((state) =>
    type === "left"
      ? state.sideBarData.leftSideBar
      : state.sideBarData.rightSideBar
  );
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

  const pageString = pagesMap[currentPage] || "Settings";

  return (
    <SidebarContext.Provider value={type}>
      <StyledSidebar $isExiting={isExiting} data-testid={`${type}-side-bar`}>
        {sideBarMap[pageString](props!, type)}
      </StyledSidebar>
    </SidebarContext.Provider>
  );
}

export default Sidebar;
