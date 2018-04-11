import ActionTypes from './action-types';
import API from '../api';
import { Parser } from '../utils';

function _setLoading(dispatch, loading) {
  dispatch({
    type: ActionTypes.LOGIN_LOADING,
    loading
  });
}

function login({ email, password }) {
  return dispatch => {
    _setLoading(dispatch, true);
    API.login({ email, password })
      .then(resp => {
        dispatch({
          type: ActionTypes.LOGIN,
          accessToken: resp.data.access_token
        });
      })
      .catch(error => {
        dispatch({
          type: ActionTypes.LOGIN_ERROR_REQUEST,
          error: error.errorMessage
        });
      });
  };
}

function logout(token) {
  return dispatch => {
    _setLoading(dispatch, true);
    API.logout(token)
      .then(resp => {
        dispatch({
          type: ActionTypes.LOGOUT
        });
      })
      .catch(error => {
        dispatch({
          type: ActionTypes.LOGIN_ERROR_REQUEST,
          error: error.errorMessage
        });
      });
  };
}

function getUserInfor(token) {
  return dispatch => {
    _setLoading(dispatch, true);
    API.getUserInfo(token)
      .then(resp => {
        dispatch({
          type: ActionTypes.GET_USER_INFORMATION,
          user: Parser.parseUser(resp.data.user)
        });
      })
      .catch(error => {
        dispatch({
          type: ActionTypes.LOGIN_ERROR_REQUEST,
          error: error.errorMessage
        });
      });
  };
}

export default { login, logout, getUserInfor };
