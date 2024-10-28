import OptionsList from "./OptionsList";
import SettingsSideBarHeader from "./SettingsSideBarHeader";
import { SideBarRowProps } from "./side-bar-row/SideBarRow";

interface SettingsSideBarProps {
  children?: React.ReactNode;
  rows: SideBarRowProps[];
}

function SettingsSideBar({ rows, children }: SettingsSideBarProps) {
  return (
    <>
      <SettingsSideBarHeader />
      {children}
      <OptionsList rows={rows} />
    </>
  );
}

export default SettingsSideBar;
