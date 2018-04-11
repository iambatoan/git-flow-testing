import { ActionTypes } from '../actions';

const initialStates = {
  user: {},
  isLoading: false,
  errorMessage: ''
};

export default (state = initialStates, action = {}) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        errorMessage: '',
        isLoading: false
      };
    case ActionTypes.LOGOUT:
      return {
        ...initialStates
      };
    case ActionTypes.GET_USER_INFORMATION:
      return {
        ...state,
        user: action.user,
        errorMessage: '',
        isLoading: false
      };
    case ActionTypes.LOGIN_LOADING:
      return {
        ...state,
        isLoading: action.loading
      };
    case ActionTypes.LOGIN_ERROR_REQUEST:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error
      };
  }
  return state;
};
