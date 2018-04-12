import { ActionTypes } from '../actions';

const initialStates = {
  data: {},
  isLoading: false,
  errorMessage: ''
};

export default (state = initialStates, action = {}) => {
  switch (action.type) {
    case ActionTypes.FETCH_DETAIL_OFFER:
      return {
        ...state,
        data: action.data,
        isLoading: false
      };
    case ActionTypes.FETCH_DETAIL_OFFER_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error
      };
    case ActionTypes.FETCH_DETAIL_OFFER_LOADING:
      return {
        ...state,
        isLoading: action.loading
      };
    case ActionTypes.RESET_DETAIL_OFFER:
      return {
        ...initialStates
      };
  }
  return state;
};
