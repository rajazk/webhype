import * as userConstants from "../../constants/constants";

const inititalState = {
  isFetching: false,
  isFetched: false,
  user: {},
  message: "",
};

export function registration(state = inititalState, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case userConstants.REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        user: action.user,
      });
    case userConstants.REGISTER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: false,
        message: action.message,
      });
    case userConstants.REGISTER_RESET:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: false,
        user: {},
        message: "",
      });
    default:
      return state;
  }
}
