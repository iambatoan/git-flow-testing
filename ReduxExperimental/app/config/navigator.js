import StringConfig from './strings';

import MainView from '../container/main';
import ReduxView from '../container/redux-example';
import AutoLayoutView from '../container/autolayout-example';
import NetworkView, {
  OfferListView,
  OfferSectionList,
  DetailOfferView
} from '../container/network-example';
import AppIntro, { FullLayout, PartLayout } from '../container/app-intro';

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
    title: StringConfig.Network.Title,
    hideNavBar: true
  },
  {
    screenName: StringConfig.OfferList.Name,
    screen: OfferListView,
    title: StringConfig.OfferList.Title,
    hideNavBar: true
  },
  {
    screenName: StringConfig.OfferSectionList.Name,
    screen: OfferSectionList,
    title: StringConfig.OfferSectionList.Title,
    hideNavBar: true
  },
  {
    screenName: StringConfig.DetailOffer.Name,
    screen: DetailOfferView,
    title: StringConfig.DetailOffer.Title,
    hideNavBar: true
  },
  {
    screenName: StringConfig.AppIntro.Name,
    screen: AppIntro,
    title: StringConfig.AppIntro.Title,
    hideNavBar: true
  },
  {
    screenName: StringConfig.AppIntroFullLayout.Name,
    screen: FullLayout,
    hideNavBar: true,
    hideStatusBar: true
  },
  {
    screenName: StringConfig.AppIntroPartLayout.Name,
    screen: PartLayout,
    hideNavBar: true,
    hideStatusBar: true
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
