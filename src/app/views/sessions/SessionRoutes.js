import SignUp from "./SignUp";
import SignIn from "./SignIn";
import NotFound from "./NotFound";
import ForgotPassword from "./ForgotPassword";
import VerifyEmail from "./VerifyEmail";
import VerifyPassword from "./VerifyPassword";

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
      show: false
    },
    navbar: { show: false }
  },
  secondarySidebar: { show: false },
  footer: { show: false }
};

const sessionRoutes = [
  {
    path: "/signup",
    component: SignUp,
    settings
  },
  {
    path: "/signin",
    component: SignIn,
    settings
  },
  {
    path: "/verify-email/:id",
    component: VerifyEmail,
    settings
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    settings
  },
  {
    path: "/verify-password/:id",
    component: VerifyPassword,
    settings
  },
  {
    path: "/404",
    component: NotFound,
    settings
  }
];

export default sessionRoutes;
