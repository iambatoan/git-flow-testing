import { ActionTypes } from '../actions';

const initialStates = {
  number: 0
};

export default (state = initialStates, action = {}) => {
  switch (action.type) {
    case ActionTypes.INCREASE:
      return {
        ...state,
        number: ++state.number
      };
    case ActionTypes.DECREASE:
      return {
        ...state,
        number: --state.number
      };
  }
  return state;
};
