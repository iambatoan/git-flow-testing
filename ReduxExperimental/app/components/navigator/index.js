import React from 'react';
import { StyleSheet, View, Easing, Animated, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Header from './header';

export default class Navigator extends React.Component {
  render() {
    const { initialRouteName, screenConfig } = this.props;
    const routeConfig = screenConfig.reduce((routes, screen) => {
      const { screenName, hideNavBar } = screen;
      const navigationOptions = ({ navigation }) => {
        return {
          header: hideNavBar ? (
            <View style={styles.header} />
          ) : (
            <Header navigation={navigation} title={screenName} />
          )
        };
      };
      routes[screenName] = {
        navigationOptions,
        ...screen
      };
      return routes;
    }, {});
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
      transitionConfig,
      initialRouteName
    };
    const RootStack = StackNavigator(routeConfig, navigationConfig);
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.select({ ios: 20, android: 0 })
  }
});

Navigator.defaultProps = {
  hideNavBar: false
};
