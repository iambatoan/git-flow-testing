import React from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { NavigatorConfig } from '../config';
import { Dimens } from '../constants';

import Header from './header';

const { StackRouteConfig } = NavigatorConfig;

const _processStackRouteConfig = () => {
  const routes = {};
  Object.keys(StackRouteConfig).forEach(key => {
    const {
      title,
      navigationOptions = {},
      hideNavBar,
      hideStatusBar
    } = StackRouteConfig[key];
    let _header = undefined;
    if (hideStatusBar) {
      _header = null;
    } else if (hideNavBar) {
      _header = <View style={{ paddingTop: Dimens.STATUS_BAR_HEIGHT }} />;
    }
    const _navigationOptions = ({ navigation }) => ({
      header:
        _header !== undefined ? (
          _header
        ) : (
          <Header navigation={navigation} title={title} />
        ),
      title,
      ...navigationOptions
    });
    routes[key] = {
      ...StackRouteConfig[key],
      navigationOptions: _navigationOptions
    };
  });
  return routes;
};

const AppNavigator = StackNavigator(
  _processStackRouteConfig(),
  NavigatorConfig.StackOptions
);

export default AppNavigator;
