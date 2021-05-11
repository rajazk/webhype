
// import { authService } from '../../shared/services/auth.service';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'


export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS, payload: 'User Logout' });
  localStorage.removeItem('user');
  return true;
  // dispatch(receiveLogout());
}