import BlockIcon from "@mui/icons-material/Block";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";

const iconMap: { [key: string]: React.ReactNode } = {
  BlockIcon: <BlockIcon sx={{ color: `var(--color-icon-secondary)` }} />,
  SettingsOutlinedIcon: (
    <SettingsOutlinedIcon sx={{ color: `var(--color-icon-secondary)` }} />
  ),
  NotificationsOutlinedIcon: (
    <NotificationsOutlinedIcon sx={{ color: `var(--color-icon-secondary)` }} />
  ),
  HttpsOutlinedIcon: (
    <HttpsOutlinedIcon sx={{ color: `var(--color-icon-secondary)` }} />
  ),
  DevicesOutlinedIcon: (
    <DevicesOutlinedIcon sx={{ color: `var(--color-icon-secondary)` }} />
  ),
};

function getIcon(iconName?: string) {
  return iconName ? iconMap[iconName] : null;
}

export { getIcon };
