import { combineReducers } from "redux";
import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { alert } from "./alert.reducer";

const authReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
});

export default authReducer;
