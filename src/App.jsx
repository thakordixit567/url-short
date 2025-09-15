import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Applayout from "./layouts/Applayout";
import Landingpage from "./pages/Landingpage";
import Dashboard from "./pages/dashboard";
import Auth from "./pages/auth";
import Link from "./pages/Link";
import Redirectlink from "./pages/Redirectlink";
import UrlProvider from "./context";

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
        element: <Dashboard />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/link/:id",
        element: <Link />,
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
