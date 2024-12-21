import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import SettingsRow from "./SettingsRow";
import ConfirmDeleteGroupModal from "./ConfirmDeleteGroupModal";
import { useGroupInfo } from "./hooks/useGroupInfo";

import { getSettings } from "./data/settings";
import { sideBarPages } from "types/sideBar";

const Container = styled.div`
  background-color: var(--color-background);
  display: flex;
  flex-direction: column;
`;

function EditGroupInfo() {
  const dispatch = useDispatch();
  const {
    admins,
    groupMembers,
    isPending,
    chatType,
    numGivenPermissions,
    group
  } = useGroupInfo();

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isPending) return null;

  const backView =
    chatType === "group"
      ? sideBarPages.EDIT_GROUP_INFO
      : sideBarPages.EDIT_CHANNEL_INFO;

  const settings = getSettings({
    dispatch,
    admins,
    groupMembers,
    chatType: chatType!,
    backView,
    numGivenPermissions,
    setIsModalOpen,
    privacy: group?.privacy!,
  });

  return (
    <Container data-testid="group-settings-container">
      {isModalOpen && (
        <ConfirmDeleteGroupModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {settings.map((setting, index) => (
        <SettingsRow
          key={index}
          testid={setting.testid}
          icon={setting.icon}
          title={setting.title}
          subtitle={setting.subtitle}
          onClick={setting.onClick}
        />
      ))}
    </Container>
  );
}

export default EditGroupInfo;
