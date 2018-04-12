import { ActionTypes } from '../actions';

const initialStates = {
  offers: [],
  isLoading: false,
  errorMessage: ''
};

export default (state = initialStates, action = {}) => {
  switch (action.type) {
    case ActionTypes.FETCH_OFFER:
      return {
        ...state,
        offers: action.offers,
        isLoading: false
      };
    case ActionTypes.FETCH_OFFER_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error
      };
    case ActionTypes.FETCH_OFFER_LOADING:
      return {
        ...state,
        isLoading: action.loading
      };
    case ActionTypes.RESET_OFFER:
      return {
        ...initialStates
      };
  }
  return state;
};
