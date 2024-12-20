import { iconStrings } from "@data/icons";
import { Dispatch } from "@reduxjs/toolkit";
import { updateSideBarView } from "@state/side-bar/sideBar";
import { sideBarPages } from "types/sideBar";

type SettingsProps = {
  dispatch: Dispatch;
  admins: any[];
  groupMembers: any[];
  chatId: string;
  leaveGroup: (params: { chatId: string }) => void;
  setIsRightSideBarOpen: (value: boolean) => void;
  resetRightSideBar: () => { type: string };
};

const getSettings = ({
  dispatch,
  admins,
  groupMembers,
  chatId,
  leaveGroup,
  setIsRightSideBarOpen,
  resetRightSideBar,
}: SettingsProps) => [
  {
    testid: "group-type",
    icon: "Lock" as iconStrings,
    title: "Group Type",
    subtitle: "private",
    onClick: () =>
      dispatch(
        updateSideBarView({
          redirect: sideBarPages.GROUP_TYPE,
          data: { type: "right" },
        })
      ),
  },
  {
    testid: "admins",
    icon: "Admin" as iconStrings,
    title: "Administrators",
    subtitle: admins.length,
    onClick: () =>
      dispatch(
        updateSideBarView({
          redirect: sideBarPages.ADMINS,
          data: { type: "right" },
        })
      ),
  },
  {
    testid: "members",
    icon: "Members" as iconStrings,
    title: "Members",
    subtitle: groupMembers.length,
    onClick: () =>
      dispatch(
        updateSideBarView({
          redirect: sideBarPages.MEMBERS,
          data: { type: "right" },
        })
      ),
  },
  {
    testid: "permissions",
    icon: "Members" as iconStrings,
    title: "Permissions",
    subtitle: "13/13",
    onClick: () =>
      dispatch(
        updateSideBarView({
          redirect: sideBarPages.PERMISSIONS,
          data: { type: "right" },
        })
      ),
  },
  {
    testid: "leave-group-button",
    icon: "Delete" as iconStrings,
    title: "Delete and Leave Group",
    subtitle: "",
    onClick: () => {
      leaveGroup({ chatId });
      setIsRightSideBarOpen(false);
      dispatch(resetRightSideBar());
    },
  },
];

export { getSettings };
