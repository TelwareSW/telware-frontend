import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/theme";
import sideBarReducer from "./side-bar/sideBar";
import userReducer from "./user/user";
import searchReducer from "./messages/search";
import globalSearchReducer from "./messages/global-search";
import activeMessageReducer from "./messages/activeMessage";
import chatsReducer from "./messages/chats";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    sideBarData: sideBarReducer,
    user: userReducer,
    search: searchReducer,
    activeMessage: activeMessageReducer,
    chats: chatsReducer,
    globalSearch: globalSearchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
