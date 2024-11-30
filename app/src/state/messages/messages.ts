import { messages } from "@mocks/data/messages";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageInterface } from "types/messages";

interface MessagesState {
  messages: MessageInterface[];
  isTyping: boolean;
  showCheckBox: boolean;
  selectedMessages: string[]; //indicates ids only of selected messages
}

const initialState: MessagesState = {
  messages: messages,
  isTyping: false,
  showCheckBox: false,
  selectedMessages: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageInterface>) => {
      state.messages.push(action.payload);
    },

    deleteMessage: (
      state,
      action: PayloadAction<{ id: string; chatId: string }>
    ) => {
      state.messages = state.messages.filter((message) => {
        const { chatId, id } = action.payload;
        if (message.chatId == chatId) return message.id !== id;
        else return message;
      });
    },

    editMessage: (
      state,
      action: PayloadAction<{
        chatId: string;
        messageId: string;
        content: string;
      }>
    ) => {
      const { chatId, messageId, content } = action.payload;

      const message = state.messages.find(
        (msg) => msg.id === messageId && msg,
        chatId === chatId
      );

      if (message) {
        message.content = content;
      }
    },

    pinMessage: (
      state,
      action: PayloadAction<{ messageId: string; chatId: string }>
    ) => {
      const { messageId, chatId } = action.payload;
      const message = state.messages.find(
        (msg) => msg.id === messageId && msg.chatId == chatId
      );
      if (message) {
        message.isPinned = true;
      }
    },

    unpinMessage: (
      state,
      action: PayloadAction<{ messageId: string; chatId: string }>
    ) => {
      const { messageId, chatId } = action.payload;
      const message = state.messages.find(
        (msg) => msg.id === messageId && msg.chatId == chatId
      );
      if (message) {
        message.isPinned = false;
      }
    },

    clearMessages: (state, action: PayloadAction<{ chatId: string }>) => {
      const { chatId } = action.payload;
      state.messages.filter((msg) => msg.chatId !== chatId);
    },
    setIsTyping: (state, action: PayloadAction<{ isTyping: boolean }>) => {
      const { isTyping } = action.payload;
      state.isTyping = isTyping;
    },

    setShowCheckBox: (
      state,
      action: PayloadAction<{ showCheckBox: boolean }>
    ) => {
      const { showCheckBox } = action.payload;
      if (!showCheckBox) {
        state.selectedMessages = [];
      }
      state.showCheckBox = showCheckBox;
    },

    setIsOptionListOpen: (
      state,
      action: PayloadAction<{ value: boolean; id: string }>
    ) => {
      const { id, value } = action.payload;
      state.messages.forEach((msg) => {
        if (msg.id === id) {
          msg.isOptionListOpen = value;
        } else {
          msg.isOptionListOpen = false;
        }
      });
    },

    SelectMessage: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.selectedMessages.push(id);
    },

    removeSelectedMessage: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.selectedMessages = state.selectedMessages.filter(
        (msgId) => msgId !== id
      );
    },

    setIsSent: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      const msg = state.messages.find((msg) => msg.id === id);

      if (msg) {
        msg.isSent = true;
      }
    },

    setIsViewed: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.messages.forEach((msg) => {
        if (msg.id === id) {
          msg.isViewed = true;
        }
      });
    },

    setIsRecieved: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.messages.forEach((msg) => {
        if (msg.id === id) {
          msg.isRecieved = true;
        }
      });
    },
  },
});

export const {
  addMessage,
  deleteMessage,
  editMessage,
  clearMessages,
  pinMessage,
  unpinMessage,
  setIsTyping,
  setShowCheckBox,
  setIsOptionListOpen,
  SelectMessage,
  removeSelectedMessage,
  setIsSent,
  setIsViewed,
  setIsRecieved,
} = messagesSlice.actions;
export default messagesSlice.reducer;
export type { MessageInterface, MessagesState };
