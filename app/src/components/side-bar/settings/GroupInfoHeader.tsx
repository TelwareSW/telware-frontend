import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@hooks/useGlobalState";

import Heading from "@components/Heading";
import Icon from "@components/Icon";

import { getIcon } from "@data/icons";

import { useSidebarType } from "../SideBarContext";
import { sideBarPages } from "types/sideBar";
import { updateSideBarView } from "@state/side-bar/sideBar";
import BackArrow from "@components/BackArrow";

const StyledSideBarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1rem;

  background-color: var(--color-background);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

function GroupInfoHeader() {
  const type = useSidebarType();

  const { title } = useAppSelector((state) =>
    type === "left"
      ? state.sideBarData.leftSideBar
      : state.sideBarData.rightSideBar
  );

  const dispatch = useAppDispatch();

  function handleEdit() {
    dispatch(
      updateSideBarView({
        redirect: sideBarPages.EDIT_GROUP_INFO,
        data: { type },
      })
    );
  }

  //TODO: handle onClose
  return (
    <StyledSideBarHeader data-testid="settings-side-bar-header">
      <Container>
        {title === "Group Info" ? (
          <Icon>{getIcon("Close")}</Icon>
        ) : (
          <BackArrow />
        )}
        <Heading data-testid="settings-title" as={"h4"}>
          {title}
        </Heading>
      </Container>
      {title === "Group Info" && (
        <Icon onClick={handleEdit}>{getIcon("Edit")}</Icon>
      )}
    </StyledSideBarHeader>
  );
}

export default GroupInfoHeader;
