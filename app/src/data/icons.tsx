import React, { lazy, Suspense } from "react";
import { SxProps } from "@mui/material/styles";

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
  Send,
  Pause,
  Play,
  CalendarToday,
  KeyboardArrowUp,
  KeyboardArrowDown,
  ContentCopy,
  CircularProgress,
  RightArrow,
  LeftArrow,
  Forward,
  MessagingOptions,
  Pin,
  Reply,
  PushPin,
  GifBox,
  EmojiBox,
  StickerBox,
  Menu,
  DoDisturb,
  Check,
  AlternateEmailTwoTone,
  Email,
  Info,
  Phone,
  ArrowForward,
  Mute,
  EndCall,
  AddMembers,
  Lock,
  Admin,
  Members,
  RemoveMember,
  Eye,
  Sun,
  Group,
}

type iconStrings = keyof typeof icons;

type IconConfig = {
  importFn: () => Promise<{
    default: React.ComponentType<object>;
  }>;
  defaultProps?: {
    sx?: SxProps;
    fontSize?: "small" | "medium" | "large";
    style?: React.CSSProperties;
  };
};

const iconImports: Record<iconStrings, IconConfig> = {
  Group: {
    importFn: () => import("@mui/icons-material/GroupsOutlined"),
    defaultProps: { sx: { color: `var(--color-icon-secondary)` } },
  },
  Sun: {
    importFn: () => import("@mui/icons-material/WbSunny"),
    defaultProps: { sx: { color: `white` } },
  },
  BlockIcon: {
    importFn: () => import("@mui/icons-material/Block"),
    defaultProps: { sx: { color: `var(--color-icon-secondary)` } },
  },
  SettingsOutlinedIcon: {
    importFn: () => import("@mui/icons-material/SettingsOutlined"),
    defaultProps: { sx: { color: `var(--color-icon-secondary)` } },
  },
  NotificationsOutlinedIcon: {
    importFn: () => import("@mui/icons-material/NotificationsOutlined"),
    defaultProps: { sx: { color: `var(--color-icon-secondary)` } },
  },
  HttpsOutlinedIcon: {
    importFn: () => import("@mui/icons-material/HttpsOutlined"),
    defaultProps: { sx: { color: `var(--color-icon-secondary)` } },
  },
  DevicesOutlinedIcon: {
    importFn: () => import("@mui/icons-material/DevicesOutlined"),
    defaultProps: { sx: { color: `var(--color-icon-secondary)` } },
  },
  BackArrow: {
    importFn: () => import("@mui/icons-material/ArrowBackOutlined"),
    defaultProps: { sx: { color: `var(--color-icon-secondary)` } },
  },
  Contacts: {
    importFn: () => import("@mui/icons-material/PersonOutlineOutlined"),
    defaultProps: { sx: { color: `var(--color-icon-secondary)` } },
  },
  Settings: {
    importFn: () => import("@mui/icons-material/SettingsOutlined"),
    defaultProps: { sx: { color: `var(--color-icon-secondary)` } },
  },
  NightMode: {
    importFn: () => import("@mui/icons-material/NightlightOutlined"),
    defaultProps: { sx: { color: `var(--color-icon-secondary)` } },
  },
  Add: {
    importFn: () => import("@mui/icons-material/Add"),
    defaultProps: {
      fontSize: "large",
      sx: { color: `var(--color-search-border)` },
    },
  },
  Edit: {
    importFn: () => import("@mui/icons-material/Edit"),
    defaultProps: { sx: { color: `var(--color-icon-secondary)` } },
  },
  AddStory: {
    importFn: () => import("@mui/icons-material/PhotoCamera"),
    defaultProps: {
      fontSize: "large",
      sx: { color: `var(--color-search-border)` },
    },
  },
  Logout: {
    importFn: () => import("@mui/icons-material/Logout"),
    defaultProps: {
      fontSize: "large",
      sx: { color: `var(--color-icon-secondary)` },
    },
  },
  ProflePicture: {
    importFn: () => import("@mui/icons-material/Person"),
    defaultProps: {
      fontSize: "large",
      sx: { color: `var(--color-background)` },
    },
  },
  NewGroup: {
    importFn: () => import("@mui/icons-material/GroupOutlined"),
    defaultProps: { sx: { color: `var(--color-icon-secondary)` } },
  },
  NewChannel: {
    importFn: () => import("@mui/icons-material/CampaignOutlined"),
    defaultProps: { sx: { color: `var(--color-icon-secondary)` } },
  },
  NewChat: {
    importFn: () => import("@mui/icons-material/PersonAddAltOutlined"),
    defaultProps: { sx: { color: `var(--color-icon-secondary)` } },
  },
  Show: {
    importFn: () => import("@mui/icons-material/Visibility"),
    defaultProps: {
      fontSize: "medium",
      sx: { color: `var(--color-icon-secondary)` },
    },
  },
  Hide: {
    importFn: () => import("@mui/icons-material/VisibilityOff"),
    defaultProps: {
      fontSize: "medium",
      sx: { color: `var(--color-icon-secondary)` },
    },
  },
  Close: {
    importFn: () => import("@mui/icons-material/CloseOutlined"),
    defaultProps: {
      sx: { color: `var(--color-icon-secondary)`, fontSize: "1.75rem" },
    },
  },
  Unlock: {
    importFn: () => import("@mui/icons-material/NoEncryptionOutlined"),
    defaultProps: { sx: { color: `var(--color-icon-secondary)` } },
  },
  Record: {
    importFn: () => import("@mui/icons-material/KeyboardVoice"),
    defaultProps: { fontSize: "medium" },
  },
  Attatch: {
    importFn: () => import("@mui/icons-material/AttachFile"),
    defaultProps: {
      sx: {
        cursor: "pointer",
        color: `var(--color-icon-secondary)`,
        fontSize: "1.5rem",
      },
    },
  },
  Emojie: {
    importFn: () => import("@mui/icons-material/SentimentSatisfiedAlt"),
    defaultProps: {
      sx: {
        cursor: "pointer",
        color: `var(--color-icon-secondary)`,
        fontSize: "1.5rem",
      },
    },
  },
  More: {
    importFn: () => import("@mui/icons-material/MoreVert"),
    defaultProps: {
      sx: {
        cursor: "pointer",
        color: `var(--color-icon-secondary)`,
        fontSize: "1.5rem",
      },
    },
  },
  Search: {
    importFn: () => import("@mui/icons-material/Search"),
    defaultProps: {
      sx: {
        cursor: "pointer",
        color: `var(--color-icon-secondary)`,
        fontSize: "1.5rem",
      },
    },
  },
  Call: {
    importFn: () => import("@mui/icons-material/LocalPhone"),
    defaultProps: {
      sx: {
        cursor: "pointer",
        color: `var(--color-icon-secondary)`,
        fontSize: "1.5rem",
      },
    },
  },
  AddPhoto: {
    importFn: () => import("@mui/icons-material/AddAPhotoOutlined"),
    defaultProps: { fontSize: "large" },
  },
  Delete: {
    importFn: () => import("@mui/icons-material/DeleteOutlineOutlined"),
    defaultProps: { sx: { color: "white" } },
  },
  Send: {
    importFn: () => import("@mui/icons-material/Send"),
    defaultProps: {},
  },
  Pause: {
    importFn: () => import("@mui/icons-material/PauseOutlined"),
    defaultProps: {},
  },
  Play: {
    importFn: () => import("@mui/icons-material/PlayArrow"),
    defaultProps: {},
  },
  CalendarToday: {
    importFn: () => import("@mui/icons-material/CalendarToday"),
    defaultProps: {
      sx: {
        color: `var(--color-icon-secondary)`,
        fontSize: "1.5rem",
      },
    },
  },
  ContentCopy: {
    importFn: () => import("@mui/icons-material/ContentCopy"),
    defaultProps: {
      sx: {
        color: `var(--color-icon-secondary)`,
        fontSize: "1.5rem",
      },
    },
  },
  KeyboardArrowUp: {
    importFn: () => import("@mui/icons-material/KeyboardArrowUp"),
    defaultProps: {
      sx: {
        color: `var(--color-icon-secondary)`,
        fontSize: "1.5rem",
      },
    },
  },
  KeyboardArrowDown: {
    importFn: () => import("@mui/icons-material/KeyboardArrowDown"),
    defaultProps: {
      sx: {
        color: `var(--color-icon-secondary)`,
        fontSize: "1.5rem",
      },
    },
  },
  CircularProgress: {
    importFn: () => import("@mui/material/CircularProgress"),
    defaultProps: {
      sx: {
        color: `var(--accent-color)`,
        fontSize: "1.5rem",
      },
      style: { width: "1.5rem", height: "1.5rem" },
    },
  },
  RightArrow: {
    importFn: () => import("@mui/icons-material/KeyboardArrowRightOutlined"),
    defaultProps: {
      sx: {
        color: `var(--color-icon-secondary)`,
        fontSize: "3.5rem",
      },
    },
  },
  LeftArrow: {
    importFn: () => import("@mui/icons-material/KeyboardArrowLeftOutlined"),
    defaultProps: {
      sx: {
        color: `var(--color-icon-secondary)`,
        fontSize: "3.5rem",
      },
    },
  },
  Forward: {
    importFn: () => import("@mui/icons-material/Shortcut"),
    defaultProps: {
      sx: {
        color: `var(--color-icon-secondary)`,
        fontSize: "1.75rem",
      },
    },
  },
  MessagingOptions: {
    importFn: () => import("@mui/icons-material/KeyboardArrowDown"),
    defaultProps: {},
  },
  Pin: {
    importFn: () => import("@mui/icons-material/Pin"),
    defaultProps: {
      sx: {
        color: `var(--color-icon-secondary)`,
        fontSize: "1.5rem",
      },
    },
  },
  Reply: {
    importFn: () => import("@mui/icons-material/ReplyOutlined"),
    defaultProps: {},
  },
  PushPin: {
    importFn: () => import("@mui/icons-material/PushPinOutlined"),
    defaultProps: { fontSize: "small" },
  },
  GifBox: {
    importFn: () => import("@mui/icons-material/GifBoxOutlined"),
    defaultProps: { fontSize: "large" },
  },
  EmojiBox: {
    importFn: () => import("@mui/icons-material/EmojiEmotionsOutlined"),
    defaultProps: { fontSize: "large" },
  },
  StickerBox: {
    importFn: () => import("@mui/icons-material/StickyNote2Outlined"),
    defaultProps: { fontSize: "large" },
  },
  Menu: {
    importFn: () => import("@mui/icons-material/MenuOutlined"),
    defaultProps: { fontSize: "large" },
  },
  Check: {
    importFn: () => import("@mui/icons-material/Check"),
    defaultProps: { fontSize: "large" },
  },
  DoDisturb: {
    importFn: () => import("@mui/icons-material/DoDisturbOnOutlined"),
    defaultProps: { fontSize: "large" },
  },
  AlternateEmailTwoTone: {
    importFn: () => import("@mui/icons-material/AlternateEmailTwoTone"),
    defaultProps: { fontSize: "large" },
  },
  Email: {
    importFn: () => import("@mui/icons-material/Email"),
    defaultProps: { fontSize: "large" },
  },
  Info: {
    importFn: () => import("@mui/icons-material/Info"),
    defaultProps: { fontSize: "large" },
  },
  Phone: {
    importFn: () => import("@mui/icons-material/Phone"),
    defaultProps: { fontSize: "large" },
  },

  ArrowForward: {
    importFn: () => import("@mui/icons-material/ArrowForward"),
    defaultProps: { fontSize: "large" },
  },
  Mute: {
    importFn: () => import("@mui/icons-material/Mic"),
    defaultProps: { fontSize: "large" },
  },
  EndCall: {
    importFn: () => import("@mui/icons-material/CallEnd"),
    defaultProps: { fontSize: "large" },
  },
  AddMembers: {
    importFn: () => import("@mui/icons-material/PersonAddAlt1"),
    defaultProps: { fontSize: "large" },
  },
  Lock: {
    importFn: () => import("@mui/icons-material/LockOutlined"),
  },
  Admin: {
    importFn: () => import("@mui/icons-material/AdminPanelSettingsOutlined"),
  },
  Members: {
    importFn: () => import("@mui/icons-material/PeopleOutlineOutlined"),
  },
  RemoveMember: {
    importFn: () => import("@mui/icons-material/RemoveCircleOutline"),
    defaultProps: { fontSize: "small" },
  },
  Eye: {
    importFn: () => import("@mui/icons-material/Visibility"),
    defaultProps: { fontSize: "small" },
  },
};

const iconCache = new Map<string, React.ReactElement>();

function getIcon(
  iconName?: iconStrings,
  customProps?: {
    sx?: SxProps;
    fontSize?: "small" | "medium" | "large";
    style?: React.CSSProperties;
  }
) {
  if (!iconName) return undefined;

  const iconConfig = iconImports[iconName];
  if (!iconConfig) return undefined;

  const cacheKey = `${iconName}-${JSON.stringify(customProps)}`;
  if (iconCache.has(cacheKey)) {
    return iconCache.get(cacheKey);
  }

  const LazyIcon = lazy(iconConfig.importFn);

  const mergedProps = {
    ...iconConfig.defaultProps,
    ...customProps,
    sx: {
      ...iconConfig.defaultProps?.sx,
      ...customProps?.sx,
    },
  };

  const iconElement = (
    <Suspense fallback={<div style={{ width: "24px", height: "24px" }}></div>}>
      <LazyIcon {...mergedProps} />
    </Suspense>
  );

  iconCache.set(cacheKey, iconElement);

  return iconElement;
}

export { getIcon, icons };
export type { iconStrings };
