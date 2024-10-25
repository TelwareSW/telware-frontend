import BlockIcon from "@mui/icons-material/Block";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import AddIcon from "@mui/icons-material/Add";
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
  BackArrow: (
    <ArrowBackOutlinedIcon
      sx={{
        color: `var(--color-icon-secondary)`,
      }}
    />
  ),
  Contacts: (
    <PersonOutlineOutlinedIcon
      sx={{
        color: `var(--color-icon-secondary)`,
      }}
    />
  ),
  Settings: (
    <SettingsOutlinedIcon
      sx={{
        color: `var(--color-icon-secondary)`,
      }}
    />
  ),
  NightMode: (
    <NightlightOutlinedIcon
      sx={{
        color: `var(--color-icon-secondary)`,
      }}
    />
  ),
  AddContacts: (
    <AddIcon fontSize="large" sx={{ color: `var(--color-search-border)` }} />
  ),
  Edit: (
    <EditIcon fontSize="large" sx={{ color: `var(--color-icon-secondary)` }} />
  ),
  AddStory: (
    <PhotoCameraIcon
      fontSize="large"
      sx={{ color: `var(--color-search-border)` }}
    />
  ),
  Logout: (
    <LogoutIcon
      fontSize="large"
      sx={{ color: `var(--color-icon-secondary)` }}
    />
  ),
  ProflePicture: (
    <PersonIcon
      fontSize="large"
      sx={{ color: `var(--color-icon-secondary)` }}
    />
  ),
};

function getIcon(iconName?: string) {
  return iconName ? iconMap[iconName] : null;
}

export { getIcon };
