import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@hooks/useGlobalState";
import Heading from "@components/Heading";
import BackArrow from "@components/BackArrow";
import CircleIcon from "@components/CircleIcon";
import { useLogout } from "@features/authentication/logout/hooks/useLogout";
import { updateSideBarView } from "@state/side-bar/sideBar";
import { sideBarPages } from "types/sideBar";
const StyledSideBarHeader = styled.div`
  height: 4rem !important;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;

  gap: 2rem;
  padding-left: 1rem;

  background-color: var(--color-background);
  border-bottom: 2px solid var(--color-item-hover);
`;
const StyledIconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  gap: 1rem;
  padding-right: 1rem;
  flex: 1;
`;

function SettingsSideBarHeader() {
  const { title } = useAppSelector((state) => state.sideBarData);
  const { logout } = useLogout();
  const dispatch = useAppDispatch();

  return (
    <StyledSideBarHeader data-testid="settings-side-bar-header">
      <BackArrow />
      <Heading data-testid="settings-title" as={"h4"}>
        {title}
      </Heading>
      {title === "Settings" && (
        <StyledIconsContainer>
          <CircleIcon
            data-testid="profile-update-icon"
            $icon="Edit"
            $padding={0.2}
            $size={1.8}
            $color="var(--color-text)"
            $bgColor="var(--color-pattern)"
            onClick={() =>
              dispatch(
                updateSideBarView({ redirect: sideBarPages.PROFILE_UPDATE })
              )
            }
          />
          <CircleIcon
            data-testid="logout-icon"
            onClick={logout}
            $icon="Logout"
            $padding={0.2}
            $size={1.8}
            $color="var(--color-text)"
            $bgColor="var(--color-pattern)"
          />
        </StyledIconsContainer>
      )}
    </StyledSideBarHeader>
  );
}

export default SettingsSideBarHeader;
