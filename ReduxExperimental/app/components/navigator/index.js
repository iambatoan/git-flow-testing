import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { NavigatorConfig } from '../../config';
import Header from './header';
import { Dimens } from '../../constants';

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.select({ ios: Dimens.STATUS_BAR_HEIGHT, android: 0 })
  }
});

export default class Navigator extends React.Component {
  render() {
    const { initialRouteName, screenConfig } = this.props;
    const routeConfig = screenConfig.reduce((routes, screen) => {
      const { screenName, hideNavBar } = screen;
      const navigationOptions = ({ navigation }) => ({
        header: hideNavBar ? (
          <View style={styles.header} />
        ) : (
          <Header
            containerStyle={styles.header}
            navigation={navigation}
            title={screenName}
          />
        )
      });
      routes[screenName] = {
        navigationOptions,
        ...screen
      };
      return routes;
    }, {});
    const navigationConfig = {
      transitionConfig: NavigatorConfig.DefaultTransitionConfig,
      initialRouteName
    };
    const RootStack = StackNavigator(routeConfig, navigationConfig);
    return <RootStack />;
  }
}

Navigator.defaultProps = {
  hideNavBar: false
};
