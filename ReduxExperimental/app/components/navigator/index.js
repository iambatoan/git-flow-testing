import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Header from './header';

export default class Navigator extends React.Component {
  render() {
    const { initialRouteName, screenConfig } = this.props;
    const routeConfig = screenConfig.reduce((routes, screen) => {
      const { screenName } = screen;
      routes[screenName] = {
        ...screen
      };
      return routes;
    }, {});
    const navigationOptions = ({ navigation }) => {
      return {
        header: <Header navigation={navigation} />
      };
    };
    const navigationConfig = {
      navigationOptions,
      transitionConfig: () => ({
        containerStyle: {
          backgroundColor: 'transparent'
        }
      }),
      initialRouteName
    };
    const RootStack = StackNavigator(routeConfig, navigationConfig);
    return <RootStack />;
  }
}
