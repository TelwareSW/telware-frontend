import { getChatByID } from "@features/chats/utils/helpers";
import { Chat, Member } from "@mocks/data/chats";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageInterface } from "types/messages";

interface DetailedChatInterface extends Chat {
  messages: MessageInterface[];
  isTyping: boolean;
  showCheckBox: boolean;
  selectedMessages: string[]; //indicates ids only of selected messages
  lastMessage?: {
    _id: string;
    content: string;
    senderId: string;
    timestamp: string;
  };
  name?: string;
}

interface ChatsState {
  chats: DetailedChatInterface[];
  members: Member[];
}

const initialState: ChatsState = {
  chats: [],
  members: [],
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setAllChats: (state, action: PayloadAction<{ chatsData: ChatsState }>) => {
      state.chats = action.payload.chatsData.chats;
      state.members = action.payload.chatsData.members;
    },

    addMessage: (
      state,
      action: PayloadAction<{ chatId: string; message: MessageInterface }>
    ) => {
      const { chatId, message } = action.payload;
      const chat = getChatByID({ chats: state.chats, chatID: chatId });
      chat?.messages.push(message);
    },

    deleteMessage: (
      state,
      action: PayloadAction<{ messageId: string; chatId: string }>
    ) => {
      const { messageId, chatId } = action.payload;
      const chat = getChatByID({ chats: state.chats, chatID: chatId });
      chat?.messages.filter((msg) => msg._id !== messageId);
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

      const chat = getChatByID({ chats: state.chats, chatID: chatId });

      const message = chat?.messages.find((msg) => msg._id === messageId);

      if (message) {
        message.content = content;
      }
    },

    pinMessage: (
      state,
      action: PayloadAction<{ messageId: string; chatId: string }>
    ) => {
      const { messageId, chatId } = action.payload;
      const chat = getChatByID({ chats: state.chats, chatID: chatId });

      const message = chat?.messages.find((msg) => msg._id === messageId);
      if (message) {
        message.isPinned = true;
      }
    },

    unpinMessage: (
      state,
      action: PayloadAction<{ messageId: string; chatId: string }>
    ) => {
      const { messageId, chatId } = action.payload;
      const chat = getChatByID({ chats: state.chats, chatID: chatId });

      const message = chat?.messages.find((msg) => msg._id === messageId);
      if (message) {
        message.isPinned = false;
      }
    },

    clearMessages: (state, action: PayloadAction<{ chatId: string }>) => {
      const { chatId } = action.payload;
      const chat = getChatByID({ chats: state.chats, chatID: chatId });

      chat?.messages.filter((msg) => msg.chatId !== chatId);
    },

    setIsTyping: (
      state,
      action: PayloadAction<{ chatId: string; isTyping: boolean }>
    ) => {
      const { isTyping, chatId } = action.payload;
      const chat = getChatByID({ chats: state.chats, chatID: chatId });
      if (chat) {
        chat.isTyping = isTyping;
      }
    },

    setShowCheckBox: (
      state,
      action: PayloadAction<{ chatId: string; showCheckBox: boolean }>
    ) => {
      const { chatId, showCheckBox } = action.payload;
      const chat = getChatByID({ chats: state.chats, chatID: chatId });

      if (chat) {
        if (!showCheckBox) chat.selectedMessages = [];

        chat.showCheckBox = showCheckBox;
      }
    },

    SelectMessage: (
      state,
      action: PayloadAction<{ chatId: string; id: string }>
    ) => {
      const { chatId, id } = action.payload;
      const chat = getChatByID({ chats: state.chats, chatID: chatId });

      chat?.selectedMessages.push(id);
    },

    removeSelectedMessage: (
      state,
      action: PayloadAction<{ chatId: string; id: string }>
    ) => {
      const { chatId, id } = action.payload;
      const chat = getChatByID({ chats: state.chats, chatID: chatId });
      if (chat) {
        chat.selectedMessages = chat?.selectedMessages.filter(
          (msgId) => msgId !== id
        );
      }
    },

    mergeMessages: (
      state,
      action: PayloadAction<{
        chatId: string;
        newMessages: MessageInterface[];
      }>
    ) => {
      const { chatId, newMessages } = action.payload;
      const chat = getChatByID({ chats: state.chats, chatID: chatId });
      if (chat) {
        chat.messages = [...newMessages, ...chat.messages];
      }
    },

    updateLastMessage: (
      state,
      action: PayloadAction<{ chatId: string; lastMessage: MessageInterface }>
    ) => {
      const { chatId, lastMessage } = action.payload;
      const chat = getChatByID({ chats: state.chats, chatID: chatId });
      if (chat) {
        chat.lastMessage = lastMessage;
      }
    },
  },
});

export const {
  setAllChats,
  addMessage,
  deleteMessage,
  editMessage,
  clearMessages,
  pinMessage,
  unpinMessage,
  setIsTyping,
  setShowCheckBox,
  SelectMessage,
  removeSelectedMessage,
  mergeMessages,
  updateLastMessage,
} = chatsSlice.actions;
export default chatsSlice.reducer;
export type { DetailedChatInterface, ChatsState };
