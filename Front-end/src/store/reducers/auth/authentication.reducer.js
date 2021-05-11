import * as userConstants from "../../constants/constants";

let user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? JSON.stringify(user) : null,
  loggedIn: user ? true : false,
  isAuthenticated: false,
  isFetching: false,
  message: "",
};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        isFetching: true,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        isFetching: false,
        message: action.message,
        user: JSON.stringify(user),
        loggedIn: true,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        message: action.message,
        isAuthenticated: false,
        isFetching: false,
      };
    case userConstants.USER_SUCESS_LOUOUT:
      return {
        isAuthenticated: false,
        isFetching: false,
        message: "",
        user: null,
        loggedIn: false,
      };
    case userConstants.REGISTER_RESET:
      return Object.assign({}, state, {
        isAuthenticated: false,
        isFetching: false,
        message: "",
      });
    default:
      return state;
  }
}
