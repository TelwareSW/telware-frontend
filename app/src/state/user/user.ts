import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum privacyStates {
  EVERYONE = "everyone",
  CONTACTS = "contacts",
  NOBODY = "nobody",
}

enum activeStates {
  ENABLED = "enabled",
  DISABLED = "disabled",
}

interface userState {
  username: string;
  screenName: string;
  email: string;
  photo?: string;
  status: string;
  bio: string;

  storiesSeenPrivacy: privacyStates;
  lastSeenPrivacy: privacyStates;
  profilePhotoPrivacy: privacyStates;
  addToGroupPrivacy: privacyStates;
  addToChannelPrivacy: privacyStates;
  readReceiptsPrivacy: activeStates;
}

const initialState: userState = {
  // TODO: set at login
  username: "",
  screenName: "",
  email: "",
  photo: "",
  status: "",
  bio: "",

  storiesSeenPrivacy: privacyStates.EVERYONE,
  lastSeenPrivacy: privacyStates.EVERYONE,
  profilePhotoPrivacy: privacyStates.EVERYONE,
  addToGroupPrivacy: privacyStates.EVERYONE,
  addToChannelPrivacy: privacyStates.EVERYONE,
  readReceiptsPrivacy: activeStates.ENABLED,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      const { key, value } = action.payload;
      console.log(typeof value);
      state[key] = value as typeof value;
    },
  },
});

export const { updateUserInfo } = userSlice.actions;

export default userSlice.reducer;
export type { activeStates, privacyStates, userState };
