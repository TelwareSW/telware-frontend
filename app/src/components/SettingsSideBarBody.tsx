import OptionsList from "./OptionsList";
import { SideBarRowProps } from "./SideBarRow";
import SettingsSideBarHeader from "./SettingsSideBarHeader";

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
