import * as userConstants from "../constants/constants";
import { userService } from "../services/user.services";
import { alertActions } from "./alert.actions";
// import { history } from "../_helpers";

export const userActions = {
  login,
  logout,
  register,
  getAll,
  delete: _delete,
};


function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));
    userService.register(user).then(
      (res) => {
        dispatch(success(res));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(res) {
    return { type: userConstants.REGISTER_SUCCESS, message: res };
  }
  function failure(res) {
    return { type: userConstants.REGISTER_FAILURE, message: res };
  }
}

function getAll() {
  return (dispatch) => {
    dispatch(request());

    userService.getAll().then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    userService.delete(id).then(
      (user) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };
}
function request(id) {
  return { type: userConstants.DELETE_REQUEST, id };
}
function success(id) {
  return { type: userConstants.DELETE_SUCCESS, id };
}
function failure(id, error) {
  return { type: userConstants.DELETE_FAILURE, id, error };
}
