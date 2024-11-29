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
import NoEncryptionOutlinedIcon from "@mui/icons-material/NoEncryptionOutlined";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import SearchIcon from "@mui/icons-material/Search";
import AddAPhotoOutlined from "@mui/icons-material/AddAPhotoOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";

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
  Add,
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
  Unlock,
  Record,
  Attatch,
  Emojie,
  More,
  Call,
  Search,
  Delete,
  AddPhoto,
  CalendarToday,
  KeyboardArrowUp,
  KeyboardArrowDown,
  ContentCopy,
  CircularProgress,
  SendMessage,
  Reply,
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
  Add: (
    <AddIcon fontSize="large" sx={{ color: `var(--color-search-border)` }} />
  ),
  Edit: <EditIcon sx={{ color: `var(--color-icon-secondary)` }} />,
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
      sx={{ color: `var(--color-icon-secondary)`, fontSize: "1.5rem" }}
    />
  ),
  Unlock: (
    <NoEncryptionOutlinedIcon
      sx={{
        color: `var(--color-icon-secondary)`,
      }}
    />
  ),
  Record: <KeyboardVoiceIcon sx={{ fontSize: "1rem" }} />,
  Attatch: (
    <AttachFileIcon
      sx={{
        cursor: "pointer",
        color: `var(--color-icon-secondary)`,
        fontSize: "1.5rem",
      }}
    />
  ),

  Emojie: (
    <SentimentSatisfiedAltIcon
      sx={{
        cursor: "pointer",
        color: `var(--color-icon-secondary)`,
        fontSize: "1.5rem",
      }}
    />
  ),
  More: (
    <MoreVertIcon
      sx={{
        cursor: "pointer",
        color: `var(--color-icon-secondary)`,
        fontSize: "1.5rem",
      }}
    />
  ),
  Search: (
    <SearchIcon
      sx={{
        cursor: "pointer",
        color: `var(--color-icon-secondary)`,
        fontSize: "1.5rem",
      }}
    />
  ),
  Call: (
    <LocalPhoneIcon
      sx={{
        cursor: "pointer",
        color: `var(--color-icon-secondary)`,
        fontSize: "1.5rem",
      }}
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
  CalendarToday: (
    <CalendarTodayIcon
      sx={{
        color: `var(--color-icon-secondary)`,
        fontSize: "1.5rem",
      }}
    />
  ),
  ContentCopy: (
    <ContentCopyIcon
      sx={{
        color: `var(--color-icon-secondary)`,
        fontSize: "1.5rem",
      }}
    />
  ),
  KeyboardArrowUp: (
    <KeyboardArrowUpIcon
      sx={{
        color: `var(--color-icon-secondary)`,
        fontSize: "1.5rem",
      }}
    />
  ),
  KeyboardArrowDown: (
    <KeyboardArrowDownIcon
      sx={{
        color: `var(--color-icon-secondary)`,
        fontSize: "1.5rem",
      }}
    />
  ),
  CircularProgress: (
    <CircularProgress
      sx={{
        color: `var(--accent-color)`,
        fontSize: "1.5rem",
      }}
      style={{ width: "1.5rem", height: "1.5rem" }}
    />
  ),

  SendMessage: <SendIcon />,
  Reply: <ReplyOutlinedIcon />,
};

function getIcon(iconName?: iconStrings) {
  return iconName ? iconMap[iconName] : undefined;
}

export { getIcon };
export type { iconStrings };
