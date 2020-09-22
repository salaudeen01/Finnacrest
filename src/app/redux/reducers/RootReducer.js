import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import ScrumBoardReducer from "./ScrumBoardReducer";
import NotificationReducer from "./NotificationReducer";
import EcommerceReducer from "./EcommerceReducer";
import NavigationReducer from "./NavigationReducer";
import {authentication} from "./authentication.reducer";
import {registration} from "./registration.reducer";
import {savings} from "./savings.reducer";

const RootReducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  layout: LayoutReducer,
  scrumboard: ScrumBoardReducer,
  notification: NotificationReducer,
  ecommerce: EcommerceReducer,
  navigations: NavigationReducer,
  authentication: authentication,
  registration: registration,
  savings:savings
});

export default RootReducer;
