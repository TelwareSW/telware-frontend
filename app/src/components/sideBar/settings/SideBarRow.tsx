import styled from "styled-components";
import { updateSideBarView } from "../../../state/sideBar/sideBar";
import { updateUserInfo, userState } from "../../../state/user/user";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { privacySettingsID, privacyStates } from "../../../data/sideBar";
import { privacySettingsMap } from "../../../data/sideBar";
import { getIcon } from "../../../data/icons";
import Heading from "../../Heading";

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
  icon?: string;
  title: string;
  status?: privacySettingsID;
  count?: number;
  redirect?: number;
}

function SideBarRow({ redirect, icon, title, status, count }: SideBarRowProps) {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user);

  let currStatus = null;
  let key: keyof userState;
  if (status) {
    key = privacySettingsMap[status];
    currStatus = userData[key];
  }

  const renderedIcon = icon ? getIcon(icon) : null;
  return (
    <>
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
      {currStatus && (
        <button
          onClick={() =>
            dispatch(
              updateUserInfo({
                key: key,
                value: privacyStates.CONTACTS,
              })
            )
          }
        >
          Update
        </button>
      )}
    </>
  );
}

export default SideBarRow;
export type { SideBarRowProps };
