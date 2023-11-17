import { createBrowserRouter } from "react-router-dom";
import { Landing } from "../pages/Landing/Landing";
import { Dashboard } from "../pages/Dashboard/Dashboard";

export const authRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    name: "Dashboard",
  },
];

export const mainRoutes = [
  {
    path: "/",
    element: <Landing />,
    name: "Home",
  },
];

const routes = [
  {
    element: <Landing />,
    children: mainRoutes,
  },
  {
    element: <Dashboard />,
    children: authRoutes,
  },
];

export const router = createBrowserRouter(routes);
