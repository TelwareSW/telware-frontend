import { getChatByID } from "@features/chats/utils/helpers";
import { BlockListInterface } from "@features/privacy-settings/BlockList";
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
  isBlocked?: boolean;
  photo?: string;

  encryptionKey?: string;
  initializationVector?: string;
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
    setAllChats: (
      state,
      action: PayloadAction<{
        chatsData: ChatsState;
        blockList: BlockListInterface[];
        userId: string;
      }>
    ) => {
      const { blockList, userId, chatsData } = action.payload;
      const incomminingChats = chatsData?.chats;
      incomminingChats
        ?.map((chat) => {
          if (chat.type === "private") {
            const members = chat.members;
            const otherUser = members.filter(
              (member) => member._id !== userId
            )[0];

            if (blockList?.find((user: any) => user.id === otherUser._id)) {
              chat.isBlocked = true;
            }
          }
          return chat;
        })
        ?.filter((chat) => chat !== undefined) as DetailedChatInterface[];
      state.chats = incomminingChats;
      state.members = action.payload.chatsData.members;
    },

    addMessage: (
      state,
      action: PayloadAction<{ chatId: string; message: MessageInterface }>
    ) => {
      const { chatId, message } = action.payload;
      const chat = getChatByID({ chats: state.chats, chatID: chatId });

      if (chat?.type === "private" && chat?.isBlocked) return;
      const { _id, content, senderId, timestamp } = message;

      if (chat) {
        chat.lastMessage = { _id, content, senderId, timestamp };
        chat.messages.push(message);
      }
    },

    deleteMessage: (
      state,
      action: PayloadAction<{ messageId: string; chatId: string }>
    ) => {
      const { messageId, chatId } = action.payload;
      const chat = getChatByID({ chats: state.chats, chatID: chatId });
      if (chat) {
        chat.messages = chat?.messages.filter((msg) => msg._id !== messageId);
      }
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
      const chatIndex = state.chats.findIndex((chat) => chat._id === chatId);


      if (chatIndex !== -1) {
        const chat = state.chats[chatIndex];

        const filteredMessages = newMessages.filter(
          (msg) => !chat.messages.find((m) => m._id === msg._id)
        );

        state.chats[chatIndex] = {
          ...chat,
          messages: [...filteredMessages, ...chat.messages],
        };
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

    setChatIsBlocked: (
      state,
      action: PayloadAction<{
        chatId: string;
        isBlocked: boolean;
        userId: string;
      }>
    ) => {
      const { chatId, isBlocked, userId } = action.payload;
      const chat = getChatByID({ chats: state.chats, chatID: chatId });

      console.log(chat);
      if (chat) chat.isBlocked = isBlocked;

      const members = chat?.members;
      const otherUser = members?.filter((member) => member._id !== userId)[0];

      const user = state.members.find(
        (member) => member._id === otherUser?._id
      );

      if (user) user.isBlocked = isBlocked;
    },

    setMemberIsBlocked: (
      state,
      action: PayloadAction<{
        memberId: string;
        isBlocked: boolean;
        userId: string;
      }>
    ) => {
      const { memberId, isBlocked, userId } = action.payload;
      const member = state.members.find((member) => member._id === memberId);
      if (member) member.isBlocked = isBlocked;

      state.chats.forEach((chat) => {
        if (chat.type === "private") {
          const otherUser = chat.members.find(
            (member) => member._id !== userId
          );

          if (otherUser?._id === memberId) {
            chat.isBlocked = isBlocked;
          }
        }
      });
    },
    setName: (
      state,
      action: PayloadAction<{ chatId: string; name: string }>
    ) => {
      const { chatId, name } = action.payload;
      const chat = getChatByID({ chats: state.chats, chatID: chatId });
      if (chat) {
        chat.name = name;
      }
    },

    setPhoto: (
      state,
      action: PayloadAction<{ chatId: string; photo: string }>
    ) => {
      const { chatId, photo } = action.payload;
      const chat = getChatByID({ chats: state.chats, chatID: chatId });
      if (chat) {
        chat.photo = photo;
      }
    },

    setIsMention: (
      state,
      action: PayloadAction<{
        chatId: string;
        messageId: string;
        isMention: boolean;
      }>
    ) => {
      const { chatId, isMention, messageId } = action.payload;
      const chat = getChatByID({ chats: state.chats, chatID: chatId });
      const reqMessage = chat?.messages.find((msg) => msg._id === messageId);
      if (reqMessage) {
        reqMessage.isMention = isMention;
      }
    },

    setIsSeen: (
      state,
      action: PayloadAction<{
        chatId: string;
        messageId: string;
        isSeen: boolean;
      }>
    ) => {
      const { chatId, isSeen, messageId } = action.payload;
      const chat = getChatByID({ chats: state.chats, chatID: chatId });
      const reqMessage = chat?.messages.find((msg) => msg._id === messageId);
      if (reqMessage) {
        reqMessage.isSeen = isSeen;
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
  setChatIsBlocked,
  setMemberIsBlocked,
  setName,
  setPhoto,
  setIsMention,
  setIsSeen,
} = chatsSlice.actions;
export default chatsSlice.reducer;
export type { DetailedChatInterface, ChatsState };
