import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigator';
import { StringConfig } from '../config';
import { ActionTypes } from '../actions';

const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams(StringConfig.Home.Name)
);

export default (state = initialState, action = {}) => {
  let nextState = AppNavigator.router.getStateForAction(action, state);
  switch (action.type) {
    case ActionTypes.NAVIGATE_OFFER:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({
          routeName: StringConfig.OfferList.Name,
          params: { datas: action.data }
        }),
        state
      );
      break;
    case ActionTypes.NAVIGATE_DETAIL_OFFER:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({
          routeName: StringConfig.DetailOffer.Name,
          params: { data: action.data }
        }),
        state
      );
      break;
  }
  return nextState || state;
};
