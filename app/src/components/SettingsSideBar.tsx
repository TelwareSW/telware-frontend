import SideBarHeader from "./SideBarHeader";
import OptionsList from "./OptionsList";

interface SettingsSideBarProps {
  children?: React.ReactNode;
  onBack?: () => void;
}

function SettingsSideBar({ children, onBack }: SettingsSideBarProps) {
  return (
    <>
      <SideBarHeader onBack={onBack} />
      {children}
      <OptionsList />
    </>
  );
}

export default SettingsSideBar;
