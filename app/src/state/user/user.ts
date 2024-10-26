import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { privacyStates, activeStates } from "../../types/sideBar";
import {
  userInfoInterface,
  privacySettingsInterface,
  activitySettingsInterface,
  updatePrivacyInterface,
  updateInfoInterface,
  updateActivityInterface,
} from "../../types/user";

interface userState {
  userInfo: userInfoInterface;
  privacySettings: privacySettingsInterface;
  activitySettings: activitySettingsInterface;
}

const initialState: userState = {
  // TODO: set at login
  userInfo: {
    username: "",
    screenName: "",
    email: "",
    photo: "",
    status: "",
    bio: "",
  },
  privacySettings: {
    storiesSeenPrivacy: privacyStates.EVERYONE,
    lastSeenPrivacy: privacyStates.EVERYONE,
    profilePhotoPrivacy: privacyStates.EVERYONE,
    addToGroupPrivacy: privacyStates.EVERYONE,
    addToChannelPrivacy: privacyStates.EVERYONE,
  },
  activitySettings: {
    readReceiptsPrivacy: activeStates.ENABLED,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserPrivacy: (
      state: userState,
      action: PayloadAction<updatePrivacyInterface>
    ) => {
      const { key, value } = action.payload;
      state.privacySettings[key] = privacyStates[value];
    },
    updateUserInfo: (
      state: userState,
      action: PayloadAction<updateInfoInterface>
    ) => {
      const { key, value } = action.payload;
      state.userInfo[key] = value;
    },
    updateUserActivity: (
      state: userState,
      action: PayloadAction<updateActivityInterface>
    ) => {
      const { key, value } = action.payload;
      state.activitySettings[key] = activeStates[value];
    },
  },
});

export const { updateUserPrivacy, updateUserInfo, updateUserActivity } =
  userSlice.actions;

export default userSlice.reducer;
export type { activeStates, privacyStates, userState };
