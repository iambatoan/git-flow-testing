import React from 'react';
import { View, Platform } from 'react-native';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';

import { NavigatorConfig } from '../config';
import { Dimens } from '../constants';

import Header from './header';

const _processRouteConfig = () =>
  NavigatorConfig.RouteConfig.reduce((routes, screen) => {
    const {
      screenName,
      hideNavBar,
      title,
      navigationOptions,
      hideStatusBar = false
    } = screen;
    const headerStyle = {
      paddingTop: Platform.select({ ios: Dimens.STATUS_BAR_HEIGHT, android: 0 })
    };
    let _header = undefined;
    if (hideStatusBar) {
      _header = null;
    }
    const _navigationOptions = ({ navigation }) => ({
      header: hideNavBar ? (
        _header
      ) : (
        <Header
          containerStyle={headerStyle}
          navigation={navigation}
          title={title}
        />
      ),
      title,
      ...navigationOptions
    });
    routes[screenName] = {
      ...screen,
      navigationOptions: _navigationOptions
    };
    return routes;
  }, {});

const AppNavigator = StackNavigator(_processRouteConfig(), {
  transitionConfig: NavigatorConfig.DefaultTransitionConfig
});

const NavigatorMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);
const addListener = createReduxBoundAddListener('root');
const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator
    navigation={addNavigationHelpers({ dispatch, state: nav, addListener })}
  />
);

const mapStatetoProps = state => ({ nav: state.nav });

export { AppNavigator, NavigatorMiddleware };
export default connect(mapStatetoProps)(AppWithNavigationState);
