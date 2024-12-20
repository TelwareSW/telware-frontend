import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageInterface } from "types/messages";

interface ChannelsState {
  activeThread: string;
  activeThreadMessages: MessageInterface[];
}

const initialState: ChannelsState = {
  activeThread: "",
  activeThreadMessages: [],
};

const channelsThreadsSlice = createSlice({
  name: "channelThreads",
  initialState,
  reducers: {
    setActiveThread: (
      state,
      action: PayloadAction<{ threadId: string; messages: MessageInterface[] }>,
    ) => {
      state.activeThread = action.payload.threadId;
      state.activeThreadMessages = action.payload.messages;
    },
    resetActiveThread: (state) => {
      state.activeThread = "";
      state.activeThreadMessages = [];
    },
  },
});

export const { setActiveThread, resetActiveThread } =
  channelsThreadsSlice.actions;
export default channelsThreadsSlice.reducer;
