import { AppNavigator } from '../navigator';
import { StringConfig } from '../config';

const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams(StringConfig.Home.Name)
);

export default (state = initialState, action = {}) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};
