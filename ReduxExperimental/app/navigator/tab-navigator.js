import { StackNavigator, TabNavigator } from 'react-navigation';

import { NavigatorConfig } from '../config';

const { TabRouteConfig, TabOptions } = NavigatorConfig;

const _processStackRouteConfig = () => {
  const routes = {};
  Object.keys(TabRouteConfig).forEach(key => {
    const { screen, title } = TabRouteConfig[key];
    let _route = { title, screen };
    if (typeof screen === 'object') {
      _route = {
        title,
        screen: StackNavigator({ ...screen })
      };
    }
    routes[key] = _route;
  });
  return routes;
};

const AppNavigator = StackNavigator({
  Home: { screen: TabNavigator(_processStackRouteConfig(), TabOptions) }
});

export default AppNavigator;
