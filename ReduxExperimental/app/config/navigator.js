import StringConfig from './strings';

import MainView from '../container/main';
import ReduxView from '../container/redux-view';
import AutoLayoutView from '../container/autolayout-view';
import NetworkView from '../container/network-view';

const RouteConfig = [
  {
    screenName: StringConfig.Home.Name,
    screen: MainView,
    title: StringConfig.Home.Title
  },
  {
    screenName: StringConfig.Redux.Name,
    screen: ReduxView,
    title: StringConfig.Redux.Title
  },
  {
    screenName: StringConfig.AutoLayout.Name,
    screen: AutoLayoutView,
    title: StringConfig.AutoLayout.Title
  },
  {
    screenName: StringConfig.Network.Name,
    screen: NetworkView,
    title: StringConfig.Network.Title
  }
];

const DefaultTransitionConfig = () => ({
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

export default { RouteConfig, DefaultTransitionConfig };
