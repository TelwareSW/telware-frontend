import styled from "styled-components";
import CircleIcon from "./CircleIcon";
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
  const toggleModalDisplay = () => {
    console.log("Toggle Modal Display");
  };
  return (
    <StyledContactsSideBar>
      <ContactsSidebarHeader />
      {children}
      <CircleIcon
        icon="AddContacts"
        onClick={toggleModalDisplay}
        right="1rem"
        bottom="1rem"
        size={3.3}
        color="white"
        bgColor="var(--color-search-border)"
      />
    </StyledContactsSideBar>
  );
}

export default ContactsSideBar;
