import styled from "styled-components";
import SideBarRow, { SideBarRowProps } from "./side-bar-row/SideBarRow";
import Heading from "@components/Heading";
import { useAppSelector } from "@hooks/useGlobalState";
import {
  activitySettingsID,
  permissionSettingsID,
  privacySettingsID,
  StatusType,
} from "types/sideBar";
import { statusMap } from "@data/sideBar";

const StyledOptionsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  border-bottom: 1px solid var(--color-item-hover);
  padding: 1rem 0;
`;

const PlaceHeader = styled.div`
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 0.5rem;
`;

function OptionsList({ rows }: { rows: SideBarRowProps[] }) {
  const { title } = useAppSelector((state) => state.sideBarData);

  return (
    <>
      {rows.length > 0 && (
        <StyledOptionsList>
          <PlaceHeader>
            <Heading as="h6">{title}</Heading>
          </PlaceHeader>
          {rows.map((item, index) => (
            <SideBarRow
              {...item}
              key={
                item.status !== undefined && item.type !== undefined
                  ? item.type === StatusType.PRIVACY
                    ? statusMap.privacy[item.status as privacySettingsID].id
                    : item.type === StatusType.ACTIVITY
                      ? statusMap.activity[item.status as activitySettingsID].id
                      : statusMap.permission[
                          item.status as permissionSettingsID
                        ].id
                  : index
              }
            />
          ))}
        </StyledOptionsList>
      )}
    </>
  );
}

export default OptionsList;
