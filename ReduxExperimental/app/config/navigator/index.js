import StringConfig from '../strings';
import {
  RouteConfig as StackRouteConfig,
  Options as StackOptions
} from './stack-navigator';
import {
  RouteConfig as TabRouteConfig,
  Options as TabOptions
} from './tab-navigator';

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

const _StackOptions = {
  ...StackOptions,
  transitionConfig: DefaultTransitionConfig
};

const _TabOptions = {
  ...TabOptions,
  transitionConfig: DefaultTransitionConfig
};

const HomeScreen = StringConfig.Home.Name;

export default {
  DefaultTransitionConfig,
  HomeScreen,
  StackRouteConfig,
  StackOptions: _StackOptions,
  TabRouteConfig,
  TabOptions: _TabOptions
};
