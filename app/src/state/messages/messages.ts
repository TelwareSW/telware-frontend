import { messages } from "@mocks/data/messages";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageInterface } from "types/messages";

interface MessagesState {
  messages: MessageInterface[];
  isTyping: boolean;
}

const initialState: MessagesState = {
  messages: messages,
  isTyping: false,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageInterface>) => {
      console.log(action.payload);
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
      action: PayloadAction<{ id: string; content: string; chatId: string }>
    ) => {
      const { id, content, chatId } = action.payload;
      const message = state.messages.find(
        (msg) => msg.id === id && msg.chatId == chatId
      );
      if (message) {
        message.content = content;
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
  },
});

export const {
  addMessage,
  deleteMessage,
  editMessage,
  clearMessages,
  setIsTyping,
} = messagesSlice.actions;
export default messagesSlice.reducer;
export type { MessageInterface, MessagesState };
