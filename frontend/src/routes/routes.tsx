import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing/Landing";

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
];

export const router = createBrowserRouter(routes);
