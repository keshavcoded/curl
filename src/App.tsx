import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./layouts/Layout";
import Landing from "./pages/Landing";
import { ThemeProvider } from "./components/ThemeProvider";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AppProvider from "./context";
import AuthCallBack from "./pages/AuthCallBack";
import ProtectedRoute from "./routes/ProtectedRoute";
import RedirectLink from "./pages/RedirectLink";
import ViewLink from "./pages/ViewLink";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/auth",
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
          {
            path: "callback",
            element: <AuthCallBack />,
          },
        ],
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/link/:id",
        element: (
          <ProtectedRoute>
            <ViewLink />
          </ProtectedRoute>
        ),
      },
      {
        path: "/:id",
        element: <RedirectLink />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
