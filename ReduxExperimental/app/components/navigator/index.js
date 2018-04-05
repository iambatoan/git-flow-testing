import React from 'react';
import { StyleSheet, View, Easing, Animated } from 'react-native';
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
    const transitionConfig = () => ({
      containerStyle: {
        backgroundColor: 'transparent'
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;
        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [layout.initWidth, 0, 0]
        });
        return { transform: [{ translateX }] };
      }
    });
    const navigationConfig = {
      navigationOptions,
      transitionConfig,
      initialRouteName
    };
    const RootStack = StackNavigator(routeConfig, navigationConfig);
    return <RootStack />;
  }
}
