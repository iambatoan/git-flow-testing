import ActionTypes from './action-types';

function increase() {
  return {
    type: ActionTypes.INCREASE
  };
}

function decrease() {
  return {
    type: ActionTypes.DECREASE
  };
}

export default { increase, decrease };
