import React from "react";
import styled from "styled-components";
import Heading from "./Heading";
import { changeData } from "../state/sideBar/sideBar";
import { useAppDispatch } from "../hooks";

const StyledSideBarRow = styled.div`
  height: 4rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding-left: 5%;
  padding-right: 5%;

  &:hover {
    background: var(--color-background-compact-menu-hover);
  }

  border-radius: var(--border-radius-modal);
`;

const RowInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;

  gap: 1.5rem;
`;

const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

interface SideBarRowProps {
  icon?: React.ReactNode;
  title: string;
  status?: string;
  count?: number;
  redirect?: number;
}

const StyledP = styled.p`
  font-size: 0.75rem;
  color: var(--color-text-secondary);
`;

function SideBarRow({ redirect, icon, title, status, count }: SideBarRowProps) {
  const dispatch = useAppDispatch();

  return (
    <StyledSideBarRow onClick={() => dispatch(changeData(redirect))}>
      <RowInfo>
        {icon}
        {status ? (
          <InnerDiv>
            <Heading as="h5">{title}</Heading>
            <StyledP>{status}</StyledP>
          </InnerDiv>
        ) : (
          <Heading as="h5">{title}</Heading>
        )}
      </RowInfo>
      {count && <StyledP>{count}</StyledP>}
    </StyledSideBarRow>
  );
}

export default SideBarRow;
export type { SideBarRowProps };
