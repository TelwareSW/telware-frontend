import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import TestComponent from "./components/testComponent"

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TestComponent/>
    </QueryClientProvider>
  )
}

export default App
