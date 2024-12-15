import styled from "styled-components";
import { getIcon } from "@data/icons";
import { useAppDispatch, useAppSelector } from "@hooks/useGlobalState";
import { updateSideBarView } from "@state/side-bar/sideBar";
import { useSidebarType } from "./side-bar/SideBarContext";

const StyledArrow = styled.div`
  width: 30px;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: var(--border-radius-modal);
  &:hover {
    background: var(--color-background-compact-menu-hover);
    cursor: pointer;
  }
`;

function BackArrow() {
  const dispatch = useAppDispatch();
  const type = useSidebarType();
  const { backView } = useAppSelector((state) =>
    type === "left"
      ? state.sideBarData.leftSideBar
      : state.sideBarData.rightSideBar
  );

  return (
    <StyledArrow
      data-testid="back-arrow-icon"
      onClick={() =>
        backView !== undefined &&
        dispatch(updateSideBarView({ redirect: backView, data: { type } }))
      }
    >
      {getIcon("BackArrow")}
    </StyledArrow>
  );
}

export default BackArrow;
