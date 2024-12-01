import styled from "styled-components";
import Heading from "@components/Heading";
import { updateSideBarView } from "@state/side-bar/sideBar";
import { useAppDispatch, useAppSelector } from "@hooks/useGlobalState";
import {
  activitySettingsID,
  permissionSettingsID,
  privacySettingsID,
  StatusType,
} from "types/sideBar";
import { getIcon, iconStrings } from "@data/icons";
import { useEffect, useState } from "react";
import { statusMap } from "@data/sideBar";
import {
  activitySettingsInterface,
  permissionsSettingsInterface,
  privacySettingsInterface,
} from "types/user";
import { DataInterface, ExtractData } from "./getDataFactory";

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
  type?: StatusType;
  status?: activitySettingsID | privacySettingsID | permissionSettingsID;
  redirect?: number;
  id: number;
}

function SideBarRow({ redirect, icon, title, status, type }: SideBarRowProps) {
  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const renderedIcon = getIcon(icon);

  const [currStatus, setCurrStatus] = useState<string | undefined>(undefined);
  const [key, setKey] = useState<
    | keyof privacySettingsInterface
    | keyof activitySettingsInterface
    | keyof permissionsSettingsInterface
    | string
    | undefined
  >(undefined);

  const dataExtractor: DataInterface = ExtractData(type, currStatus, status);
  const data = dataExtractor.getData();

  useEffect(() => {
    if (status !== undefined && type !== undefined) {
      switch (type) {
        case StatusType.PRIVACY:
          setKey(statusMap.privacy[status].id);
          if (status === privacySettingsID.BLOCK_PRIVACY)
            setCurrStatus(undefined);
          else
            setCurrStatus(
              userData?.privacySettings?.[
                key as keyof privacySettingsInterface
              ] || "everyone"
            );
          break;
        case StatusType.ACTIVITY:
          setKey(statusMap.activity[status as activitySettingsID].id);
          setCurrStatus(
            userData?.activitySettings?.[
              key as keyof activitySettingsInterface
            ] || "everyone"
          );
          break;
        case StatusType.PERMISSION:
          setKey(statusMap.permission[status as permissionSettingsID].id);
          setCurrStatus(
            userData?.permissionSettings?.[
              key as keyof permissionsSettingsInterface
            ] || "everyone"
          );
          break;
        default:
          if (title === "Blocked Users") setKey("block");

          throw new Error("Type not valid");
      }
    } else {
      setCurrStatus(undefined);
    }
  });

  return (
    <StyledSideBarRow
      onClick={() =>
        redirect && dispatch(updateSideBarView({ redirect, data }))
      }
      data-testid={key && `menu-item-${key}`}
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
    </StyledSideBarRow>
  );
}

export default SideBarRow;
export type { SideBarRowProps };
