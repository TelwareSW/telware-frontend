import styled from "styled-components";
import Heading from "../../../Heading";
import { updateSideBarView } from "../../../../state/sideBar/sideBar";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useRedux";
import {
  activitySettingsID,
  privacySettingsID,
  privacyStates,
} from "../../../../types/sideBar";
import { getIcon, iconStrings } from "../../../../data/icons";
import { useEffect, useState } from "react";
import { statusMap } from "../../../../data/sideBar";
import { activeStates } from "types/user";
import { RadioOptionInterface } from "@components/inputs/radioInput/RadioInput";

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
    cursor: pointer;
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

function ExtractData(
  privacyStatus: privacySettingsID | undefined,
  activityStatus: activitySettingsID | undefined,
  currStatus: string | undefined
) {
  let keyOptions;
  let valueOptions: string[];
  let data: any;

  if (activityStatus !== undefined || privacyStatus !== undefined) {
    let rowInfo =
      privacyStatus !== undefined
        ? statusMap.privacy[privacyStatus]
        : activityStatus !== undefined
          ? statusMap.activity[activityStatus]
          : undefined;

    valueOptions =
      privacyStatus !== undefined
        ? Object.values(privacyStates)
        : Object.values(activeStates);

    keyOptions =
      privacyStatus !== undefined
        ? Object.keys(privacyStates)
        : Object.keys(activeStates);

    let radioOptions: RadioOptionInterface[] = [];

    keyOptions.map((item, index) => {
      radioOptions.push({
        id: item,
        label: valueOptions[index],
        value: item,
      } as RadioOptionInterface);
    });

    data = {
      header: rowInfo?.name,
      state: currStatus,
      data: {
        id: rowInfo?.id,
        title: rowInfo?.subtitle,
        options: radioOptions,
      },
      updateFnType: activityStatus !== undefined ? 0 : 1,
    };
  }
  return data;
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
      setCurrStatus(userData.privacySettings[key.id]);
    } else if (activityStatus !== undefined) {
      key = statusMap.activity[activityStatus];
      setCurrStatus(userData.activitySettings[key.id]);
    } else {
      setCurrStatus(undefined);
    }
  }, [userData, privacyStatus, activityStatus]);

  const data = ExtractData(privacyStatus, activityStatus, currStatus);

  return (
    <StyledSideBarRow
      onClick={() =>
        redirect && dispatch(updateSideBarView({ redirect, data }))
      }
    >
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
