import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@hooks/useGlobalState";

import Heading from "@components/Heading";
import Icon from "@components/Icon";

import { getIcon } from "@data/icons";

import { useSidebarType } from "../SideBarContext";
import { sideBarPages } from "types/sideBar";
import { updateSideBarView } from "@state/side-bar/sideBar";
import BackArrow from "@components/BackArrow";
import { useRightSideBarContext } from "@features/groups/contexts/RightSideBarProvider";

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
  const { setIsRightSideBarOpen } = useRightSideBarContext();

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

  return (
    <StyledSideBarHeader data-testid="group-info-header">
      <Container>
        {title === "Group Info" ? (
          <Icon
            data-testid="close-button"
            onClick={() => setIsRightSideBarOpen(false)}
          >
            {getIcon("Close")}
          </Icon>
        ) : (
          <BackArrow data-testid="back-arrow" />
        )}
        <Heading data-testid="group-settings-title" as={"h4"}>
          {title}
        </Heading>
      </Container>
      {title === "Group Info" && (
        <Icon data-testid="edit-button" onClick={handleEdit}>
          {getIcon("Edit")}
        </Icon>
      )}
    </StyledSideBarHeader>
  );
}

export default GroupInfoHeader;
