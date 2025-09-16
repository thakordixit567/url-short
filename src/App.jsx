import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Applayout from "./layouts/Applayout";
import Landingpage from "./pages/Landingpage";
import Dashboard from "./pages/dashboard";
import Auth from "./pages/auth";
import Link from "./pages/Link";
import Redirectlink from "./pages/Redirectlink";
import UrlProvider from "./context";
import RequireAuth from "./components/Requireauth";

const router = createBrowserRouter([
  {
    element: <Applayout />,
    children: [
      {
        path: "/",
        element: <Landingpage />,
      },
      {
        path: "/dashboard",
        element: (
          <RequireAuth>
          <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/link/:id",
        element: (
          <RequireAuth>
            <Link/>
          </RequireAuth>
        ),
      },
      {
        path: "/:id",
        element: <Redirectlink />,
      },
    ],
  },
]);

function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
}

export default App;
