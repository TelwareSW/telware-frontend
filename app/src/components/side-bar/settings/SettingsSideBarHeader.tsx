import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@hooks/useGlobalState";
import Heading from "@components/Heading";
import BackArrow from "@components/BackArrow";
import CircleIcon from "@components/CircleIcon";
import { updateSideBarView } from "@state/side-bar/sideBar";
import { sideBarPages } from "types/sideBar";
import { useSidebarType } from "../SideBarContext";
import { useLogout } from "@features/authentication/logout/hooks/useLogout";

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
const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  gap: 1rem;
  padding-right: 1rem;
  flex: 1;
`;

function SettingsSideBarHeader() {
  const type = useSidebarType();

  const { title } = useAppSelector((state) =>
    type === "left"
      ? state.sideBarData.leftSideBar
      : state.sideBarData.rightSideBar
  );
  const { logout } = useLogout();
  const dispatch = useAppDispatch();

  return (
    <StyledSideBarHeader data-testid="settings-side-bar-header">
      <BackArrow />
      <Heading data-testid="settings-title" as={"h4"}>
        {title}
      </Heading>
      {title === "Settings" && (
        <IconsContainer>
          <CircleIcon
            data-testid="profile-update-icon"
            $icon="Edit"
            $padding={0.2}
            $size={1.8}
            $color="var(--color-text)"
            $bgColor="var(--color-pattern)"
            onClick={() =>
              dispatch(
                updateSideBarView({
                  redirect: sideBarPages.PROFILE_UPDATE,
                  data: { type },
                })
              )
            }
          />
          <CircleIcon
            data-testid="logout-icon"
            onClick={() => logout()}
            $icon="Logout"
            $padding={0.2}
            $size={1.8}
            $color="var(--color-text)"
            $bgColor="var(--color-pattern)"
          />
        </IconsContainer>
      )}
    </StyledSideBarHeader>
  );
}

export default SettingsSideBarHeader;
