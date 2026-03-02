import { createBrowserRouter } from "react-router";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { MainLayout } from "./components/MainLayout";
import { Dashboard } from "./components/Dashboard";
import { Controls } from "./components/Controls";
import { Alerts } from "./components/Alerts";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "controls", Component: Controls },
      { path: "alerts", Component: Alerts },
    ],
  },
]);
