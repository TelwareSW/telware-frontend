import BlockIcon from "@mui/icons-material/Block";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import AddIcon from "@mui/icons-material/Add";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AddAPhotoOutlined from "@mui/icons-material/AddAPhotoOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SendIcon from "@mui/icons-material/Send";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

enum icons {
  BlockIcon,
  SettingsOutlinedIcon,
  NotificationsOutlinedIcon,
  HttpsOutlinedIcon,
  DevicesOutlinedIcon,
  BackArrow,
  Contacts,
  Settings,
  NightMode,
  AddContacts,
  Edit,
  AddStory,
  Logout,
  ProflePicture,
  NewGroup,
  NewChannel,
  NewChat,
  Close,
  Show,
  Hide,
  Delete,
  AddPhoto,
  Send,
  Pause,
  Play,
}

type iconStrings = keyof typeof icons;

const iconMap: { [K in iconStrings]: React.ReactNode } = {
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
    <PersonIcon fontSize="large" sx={{ color: `var(--color-background)` }} />
  ),
  NewGroup: (
    <GroupOutlinedIcon
      sx={{
        color: `var(--color-icon-secondary)`,
      }}
    />
  ),
  NewChannel: (
    <CampaignOutlinedIcon
      sx={{
        color: `var(--color-icon-secondary)`,
      }}
    />
  ),
  NewChat: (
    <PersonAddAltOutlinedIcon
      sx={{
        color: `var(--color-icon-secondary)`,
      }}
    />
  ),
  Show: (
    <VisibilityIcon
      fontSize="medium"
      sx={{ color: `var(--color-icon-secondary)` }}
    />
  ),
  Hide: (
    <VisibilityOffIcon
      fontSize="medium"
      sx={{ color: `var(--color-icon-secondary)` }}
    />
  ),
  Close: (
    <CloseOutlinedIcon
      fontSize="large"
      sx={{ color: `var(--color-icon-secondary)` }}
    />
  ),
  AddPhoto: <AddAPhotoOutlined fontSize="large" />,
  Delete: (
    <DeleteOutlineOutlinedIcon
      sx={{
        color: "white",
      }}
    />
  ),
  Send: <SendIcon />,
  Pause: <PauseOutlinedIcon />,
  Play: <PlayArrowIcon />,
};

function getIcon(iconName?: iconStrings) {
  return iconName ? iconMap[iconName] : undefined;
}

export { getIcon };
export type { iconStrings };
