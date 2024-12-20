import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/GlobalStyles";

import { Theme } from "./state/theme/theme";
import { useAppSelector } from "./hooks/useGlobalState";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPasswordModal from "@features/authentication/reset-password/ResetPasswordModal";
import ProtectedRoute from "@components/protected-route/ProtectedRoute";
import AppLayout from "@components/AppLayout";

import ChatBox from "@features/chats/ChatBox";
import SocketProvider from "sockets/SocketProvider";
import RightSideBarProvider from "@features/groups/contexts/RightSideBarProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      retry: 3,
    },
  },
});

function App() {
  const currentTheme = useAppSelector((state) => state.theme.value);

  useEffect(() => {
    document.documentElement.className =
      currentTheme === Theme.DARK ? "dark-mode" : "light-mode";
  }, [currentTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SocketProvider>
                  <RightSideBarProvider>
                    <AppLayout />
                  </RightSideBarProvider>
                </SocketProvider>
              </ProtectedRoute>
            }
          >
            <Route path=":chatId" element={<ChatBox />} />
          </Route>
          <Route path="dashboard" element={<AdminAppLayout />} />
          <Route path="users" element={<AdminAppLayout />} />
          <Route path="settings" element={<AdminAppLayout />} />
          <Route path="groups" element={<AdminAppLayout />} />
          <Route path="login" element={<Login />} />
          <Route
            path="password-reset/:token"
            element={<ResetPasswordModal />}
          />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
