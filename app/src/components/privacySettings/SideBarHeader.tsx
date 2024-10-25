import styled from "styled-components";
import Heading from "../Heading";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateSideBarView } from "../../state/sideBar/sideBar";

const StyledSideBarHeader = styled.div`
  height: 4rem;

  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;

  gap: 2rem;
  padding-left: 1rem;

  background-color: var(--color-background);
  border-bottom: 2px solid var(--color-item-hover);
`;

const StyledDiv = styled.div`
  width: 3rem;
  height: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: var(--border-radius-modal);

  &:hover {
    background: var(--color-background-compact-menu-hover);
  }
`;

interface SideBarHeaderProps {}

function SideBarHeader({}: SideBarHeaderProps) {
  const dispatch = useAppDispatch();
  const { header, backView } = useAppSelector((state) => state.sideBarData);
  return (
    <StyledSideBarHeader>
      <StyledDiv onClick={() => dispatch(updateSideBarView(backView))}>
        <ArrowBackIcon
          sx={{
            color: `var(--color-icon-secondary)`,
          }}
        />
      </StyledDiv>
      <Heading as={"h4"}>{header}</Heading>
    </StyledSideBarHeader>
  );
}

export default SideBarHeader;
