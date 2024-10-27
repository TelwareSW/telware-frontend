import styled from "styled-components";
import { useAppSelector } from "../../../hooks/useRedux";
import Heading from "../../Heading";
import BackArrow from "../../BackArrow";
import CircleIcon from "../../CircleIcon";
import { useLogout } from "@features/authentication/logout/hooks/useLogout";
const StyledSideBarHeader = styled.div`
  height: 4rem;
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

  return (
    <StyledSideBarHeader>
      <BackArrow />
      <Heading as={"h4"}>{title}</Heading>
      {title === "Settings" && (
        <StyledIconsContainer>
          <CircleIcon
            icon="Edit"
            padding={0.2}
            size={1.8}
            color="var(--color-text)"
            bgColor="var(--color-pattern)"
          />
          <CircleIcon
            onClick={logout}
            icon="Logout"
            padding={0.2}
            size={1.8}
            color="var(--color-text)"
            bgColor="var(--color-pattern)"
          />
        </StyledIconsContainer>
      )}
    </StyledSideBarHeader>
  );
}

export default SettingsSideBarHeader;
