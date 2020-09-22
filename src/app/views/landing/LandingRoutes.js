import React from "react";
import { authRoles } from "../../auth/authRoles";

const settings = {
  activeLayout: "layout1",
  layout1Settings: {
    topbar: {
      show: false
    },
    leftSidebar: {
      show: false,
      mode: "close"
    }
  },
  layout2Settings: {
    mode: "full",
    topbar: {
      show: true
    },
    navbar: { show: false }
  },
  secondarySidebar: { show: false },
  footer: { show: false }
};

const landingRoutes = [
  {
    path: "/",
    component: React.lazy(() => import("./Landing")),
    settings
  }
];

export default landingRoutes;
