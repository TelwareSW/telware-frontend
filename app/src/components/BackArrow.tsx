import styled from "styled-components";
import { getIcon } from "../data/icons";
import { useAppDispatch, useAppSelector } from "../hooks";
import { updateSideBarView } from "../state/sideBar/sideBar";

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
  const { backView } = useAppSelector((state) => state.sideBarData);

  return (
    <StyledArrow
      onClick={() =>
        backView && dispatch(updateSideBarView({ redirect: backView }))
      }
    >
      {getIcon("BackArrow")}
    </StyledArrow>
  );
}

export default BackArrow;
