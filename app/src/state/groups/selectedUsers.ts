import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "@features/groups/hooks/useAllUsers";

const initialState = [] as UserType[];

const selectedUsersSlice = createSlice({
  name: "selectedUsers",
  initialState,
  reducers: {
    toggleSelectUser: (state, action: PayloadAction<UserType>) => {
      const userIndex = state.findIndex(
        (user) => user._id === action.payload._id
      );
      if (userIndex === -1) {
        state.push(action.payload);
      } else {
        state.splice(userIndex, 1);
      }
    },

    clearSelectedUsers: () => {
      return initialState;
    },
  },
});

export const { toggleSelectUser, clearSelectedUsers } = selectedUsersSlice.actions;
export default selectedUsersSlice.reducer;
