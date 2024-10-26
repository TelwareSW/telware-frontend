import styled from "styled-components";
import Heading from "../../Heading";
import { updateSideBarView } from "../../../state/sideBar/sideBar";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { activitySettingsID, privacySettingsID } from "../../../types/sideBar";
import { getIcon, iconStrings } from "../../../data/icons";
import { useEffect, useState } from "react";
import { statusMap } from "../../../data/sideBar";

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

const StyledP = styled.p`
  font-size: 0.75rem;
  color: var(--color-text-secondary);
`;

interface SideBarRowProps {
  icon?: iconStrings;
  title: string;
  activityStatus?: activitySettingsID;
  privacyStatus?: privacySettingsID;
  count?: number;
  redirect?: number;
}

function SideBarRow({
  redirect,
  icon,
  title,
  activityStatus,
  privacyStatus,
  count,
}: SideBarRowProps) {
  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const renderedIcon = getIcon(icon);

  const [currStatus, setCurrStatus] = useState<string | undefined>(undefined);
  useEffect(() => {
    let key;
    if (privacyStatus !== undefined) {
      key = statusMap.privacy[privacyStatus];
      setCurrStatus(userData.privacySettings[key]);
    } else if (activityStatus !== undefined) {
      key = statusMap.activity[activityStatus];
      setCurrStatus(userData.activitySettings[key]);
    }
  }, [userData, privacyStatus, activityStatus]);

  return (
    <StyledSideBarRow onClick={() => dispatch(updateSideBarView(redirect))}>
      <RowInfo>
        {renderedIcon}
        {currStatus ? (
          <InnerDiv>
            <Heading as="h5">{title}</Heading>
            <StyledP>{currStatus}</StyledP>
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
