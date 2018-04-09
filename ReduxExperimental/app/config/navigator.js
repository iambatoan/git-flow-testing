import StringConfig from './strings';

import MainView from '../container/main';
import ReduxView from '../container/redux-view';
import AutoLayoutView from '../container/autolayout-view';

const RouteConfig = [
  {
    screen: MainView,
    screenName: StringConfig.HOME_TITLE
  },
  {
    screen: ReduxView,
    screenName: StringConfig.REDUX_TITLE
  },
  {
    screen: AutoLayoutView,
    screenName: StringConfig.AUTOLAYOUT_TITLE
    // hideNavBar: true
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
