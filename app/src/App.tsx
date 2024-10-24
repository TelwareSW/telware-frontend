import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import GlobalStyles from "./styles/GlobalStyles";

import Login from "./pages/Login";
import AppLayout from "./components/AppLayout";
import { useEffect } from "react";
import { useAppSelector } from "./hooks";
import { Theme } from "./state/theme/theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
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
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<div>Signup</div>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
