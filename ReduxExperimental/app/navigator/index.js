import React from 'react';
import { BackHandler } from 'react-native';
import {
  StackNavigator,
  addNavigationHelpers,
  NavigationActions
} from 'react-navigation';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';

import { NavigatorConfig } from '../config';

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
    let _header = undefined;
    if (hideStatusBar) {
      _header = null;
    }
    const _navigationOptions = ({ navigation }) => ({
      header: hideNavBar ? (
        _header
      ) : (
        <Header navigation={navigation} title={title} />
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

class AppWithNavigationState extends React.Component {
  constructor(props) {
    super(props);
    this.onBackPress = this.onBackPress.bind(this);
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress() {
    let currentRoute = this.props.nav;
    while (
      currentRoute.routes &&
      currentRoute.index < currentRoute.routes.length
    ) {
      currentRoute = currentRoute.routes[currentRoute.index];
    }
    const routeName = currentRoute.routeName;
    if (routeName === NavigatorConfig.HomeScreen) {
      return false;
    }
    this.props.dispatch(NavigationActions.pop());
    return true;
  }

  render() {
    const addListener = createReduxBoundAddListener('root');
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
          addListener
        })}
      />
    );
  }
}

const mapStatetoProps = state => ({ nav: state.nav });

export { AppNavigator, NavigatorMiddleware };
export default connect(mapStatetoProps)(AppWithNavigationState);
