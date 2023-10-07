import "./App.css";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import { Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import PostsPage from "./pages/PostsPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users/*" element={<UsersPage />} />
          <Route path="/users/:userId/posts" element={<PostsPage />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
