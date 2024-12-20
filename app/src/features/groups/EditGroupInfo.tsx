import styled from "styled-components";
import SettingsRow from "./SettingsRow";
import { useDispatch } from "react-redux";
import { resetRightSideBar } from "@state/side-bar/sideBar";
import { useGroupInfo } from "./hooks/useGroupInfo";
import { useSocket } from "@hooks/useSocket";
import { useRightSideBarContext } from "./contexts/RightSideBarProvider";
import { getSettings } from "./data/settings";
import { sideBarPages } from "types/sideBar";

const Container = styled.div`
  background-color: var(--color-background);
  display: flex;
  flex-direction: column;
`;

function EditGroupInfo() {
  const dispatch = useDispatch();
  const { admins, groupMembers, chatId, isPending, chatType } = useGroupInfo();
  const { leaveGroup } = useSocket();
  const { setIsRightSideBarOpen } = useRightSideBarContext();

  if (isPending) return null;

  const backView =
    chatType === "group"
      ? sideBarPages.EDIT_GROUP_INFO
      : sideBarPages.EDIT_CHANNEL_INFO;

  const settings = getSettings({
    dispatch,
    admins,
    groupMembers,
    chatId: chatId!,
    leaveGroup,
    setIsRightSideBarOpen,
    resetRightSideBar,
    chatType: chatType!,
    backView,
  });

  return (
    <Container data-testid="group-settings-container">
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
