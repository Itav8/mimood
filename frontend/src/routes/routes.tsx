import { createBrowserRouter } from "react-router-dom";
import { Landing } from "../pages/Landing/Landing";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { MoodForm } from "../pages/Mood/MoodForm";
import { ActivityForm } from "../pages/Activity/ActivityForm";
import { Layout } from "../layouts/Layout";

export const authRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    name: "Dashboard",
  },
  {
    path: "/moods",
    element: <MoodForm />,
    name: "Moods",
  },
  {
    path: "/activities",
    element: <ActivityForm />,
    name: "Activities",
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
    element: <Layout />,
    children: mainRoutes,
    errorElement: <p>Error</p>,
  },
  {
    element: <Layout />,
    children: authRoutes,
  },
];

export const router = createBrowserRouter(routes);
