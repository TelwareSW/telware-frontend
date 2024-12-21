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
import { CallProvider } from "@features/calls/context/CallProvider";
import AdminAppLayout from "@features/admin/components/AdminAppLayout";
import Unauthorized from "@components/unauthorized/Unauthorized";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      retry: 3
    }
  }
});

function App() {
  const currentTheme = useAppSelector((state) => state.theme.value);
  const currentUserRole = useAppSelector((state) =>
    state.user.userInfo.isAdmin ? "admin" : "user"
  );

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
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                allowedRoles={["admin"]}
                userRole={currentUserRole}
              >
                <AdminAppLayout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                allowedRoles={["user"]}
                userRole={currentUserRole}
              >
                <CallProvider>
                  <SocketProvider>
                    <RightSideBarProvider>
                      <AppLayout />
                    </RightSideBarProvider>
                  </SocketProvider>
                </CallProvider>
              </ProtectedRoute>
            }
          >
            <Route path=":chatId" element={<ChatBox />} />
          </Route>

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
