import StringConfig from '../strings';

import MainView from '../../container/main';
import ReduxView from '../../container/redux-example';
import AutoLayoutView from '../../container/autolayout-example';
import NetworkView, {
  OfferListView,
  OfferSectionList,
  DetailOfferView
} from '../../container/network-example';
import AppIntro, { FullLayout, PartLayout } from '../../container/app-intro';
import MapView from '../../container/maps';

const RouteConfig = {
  [StringConfig.Home.Name]: {
    screen: MainView,
    title: StringConfig.Home.Title
  },
  [StringConfig.Redux.Name]: {
    screen: ReduxView,
    title: StringConfig.Redux.Title
  },
  [StringConfig.AutoLayout.Name]: {
    screen: AutoLayoutView,
    title: StringConfig.AutoLayout.Title
  },
  [StringConfig.Network.Name]: {
    screen: NetworkView,
    title: StringConfig.Network.Title
  },
  [StringConfig.OfferList.Name]: {
    screen: OfferListView,
    title: StringConfig.OfferList.Title
  },
  [StringConfig.OfferSectionList.Name]: {
    screen: OfferSectionList,
    title: StringConfig.OfferSectionList.Title
  },
  [StringConfig.DetailOffer.Name]: {
    screen: DetailOfferView,
    title: StringConfig.DetailOffer.Title
  },
  [StringConfig.AppIntro.Name]: {
    screen: AppIntro,
    title: StringConfig.AppIntro.Title
  },
  [StringConfig.AppIntroFullLayout.Name]: {
    screen: FullLayout,
    hideStatusBar: true
  },
  [StringConfig.AppIntroPartLayout.Name]: {
    screen: PartLayout,
    hideStatusBar: true
  },
  [StringConfig.Map.Name]: {
    screen: MapView,
    title: StringConfig.Map.Title,
    hideNavBar: true
  }
};

const Options = {};

export { RouteConfig, Options };
