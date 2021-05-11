// import {
//   LOGIN_REQUEST,
//   LOGIN_SUCCESS,
//   LOGIN_FAILURE,
//   LOGOUT_SUCCESS,
// } from "../actions/login.actions";

// const inititalState = {
//   isFetching: false,
//   isAuthenticated: localStorage.getItem("user") ? true : false,
// };

// function auth(state = inititalState, action) {
//   switch (action.type) {
//     // case LOGIN_REQUEST:
//     //   return Object.assign({}, state, {
//     //     isFetching: true,
//     //     isAuthenticated: false,
//     //     user: action.creds,
//     //     errorMessage: "",
//     //   });
//     // case LOGIN_SUCCESS:
//     //   return Object.assign({}, state, {
//     //     isFetching: false,
//     //     isAuthenticated: true,
//     //     errorMessage: "",
//     //   });
//     // case LOGIN_FAILURE:
//     //   return Object.assign({}, state, {
//     //     isFetching: false,
//     //     isAuthenticated: false,
//     //     errorMessage: action.message,
//     //   });
//     // case LOGOUT_SUCCESS:
//     //   return Object.assign({}, state, {
//     //     isFetching: true,
//     //     isAuthenticated: false,
//     //     errorMessage: "",
//     //   });
//     default:
//       return state;
//   }
// }

// export default auth;
