import styled from "styled-components";
import CircleIcon from "../CircleIcon";
import ContactsSidebarHeader from "./ContactsSideBarHeader";

interface ContactsSideBarProps {
  children?: React.ReactNode;
  onNavigate?: () => void;
}
const StyledContactsSideBar = styled.div`
  height: 100vh;
  background-color: var(--color-background);
  overflow-y: auto;
  position: relative;
`;
function ContactsSideBar({ children }: ContactsSideBarProps) {
  return (
    <StyledContactsSideBar>
      <ContactsSidebarHeader />
      {children}
      <CircleIcon
        $icon="Add"
        $right={1}
        $bottom={1}
        $size={3.3}
        $color="white"
        $bgColor="var(--accent-color)"
        data-testid="add-contacts-icon"
      />
    </StyledContactsSideBar>
  );
}

export default ContactsSideBar;
