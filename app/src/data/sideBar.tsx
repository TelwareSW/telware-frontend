import { SideBarRowProps } from "../components/sideBarRow";
import BlockIcon from "@mui/icons-material/Block";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import { SideBarState } from "../state/sideBar/sideBar";

enum sideBarPages {
  SETTINGS,
  PRIVACY_SETTINGS,
}

const privacySettings: SideBarState = {
  header: "Privacy",
  backView: sideBarPages.SETTINGS,
  rows: [
    {
      icon: <BlockIcon sx={{ color: `var(--color-icon-secondary)` }} />,
      title: "Blocked Users",
      count: 2,
    },
    {
      title: "Who can see my stories?",
      status: "My Contacts",
    },
    {
      title: "Who can see my last seen?",
      status: "Nobody",
    },
    {
      title: "Who can see my profile photo?",
      status: "Everybody",
    },
    {
      title: "Who can add me to group chats?",
      status: "Everybody",
    },
    {
      title: "Who can add me to channels?",
      status: "Everybody",
    },
    {
      title: "Read receipts",
      status: "Enabled",
    },
  ] as SideBarRowProps[],
};
const settings: SideBarState = {
  header: "Settings",
  rows: [
    {
      icon: (
        <SettingsOutlinedIcon sx={{ color: `var(--color-icon-secondary)` }} />
      ),
      title: "General Settings",
    },
    {
      icon: (
        <NotificationsOutlinedIcon
          sx={{ color: `var(--color-icon-secondary)` }}
        />
      ),
      title: "Notifications",
    },
    {
      icon: <HttpsOutlinedIcon sx={{ color: `var(--color-icon-secondary)` }} />,
      title: "Privacy and Security",
      redirect: sideBarPages.PRIVACY_SETTINGS,
    },
    {
      icon: (
        <DevicesOutlinedIcon sx={{ color: `var(--color-icon-secondary)` }} />
      ),
      title: "Devices",
    },
  ] as SideBarRowProps[],
};

export { settings };
export { privacySettings };
export { sideBarPages };
