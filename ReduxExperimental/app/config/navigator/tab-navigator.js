import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import StringConfig from '../strings';

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
  [StringConfig.Redux.Name]: {
    screen: ReduxView,
    title: StringConfig.Redux.Title
  },
  [StringConfig.AutoLayout.Name]: {
    screen: AutoLayoutView,
    title: StringConfig.AutoLayout.Title
  },
  [StringConfig.Network.Name]: {
    title: StringConfig.Network.Title,
    screen: {
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
      }
    }
  },
  [StringConfig.AppIntro.Name]: {
    title: StringConfig.AppIntro.Title,
    screen: {
      [StringConfig.AppIntro.Name]: {
        title: StringConfig.AppIntro.Title,
        screen: AppIntro
      },
      [StringConfig.AppIntroFullLayout.Name]: {
        screen: FullLayout
      },
      [StringConfig.AppIntroPartLayout.Name]: {
        screen: PartLayout
      }
    }
  },
  [StringConfig.Map.Name]: {
    screen: MapView,
    title: StringConfig.Map.Title
  }
};

const Options = {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      switch (routeName) {
        case StringConfig.Redux.Name:
          iconName = `ios-analytics${focused ? '' : '-outline'}`;
          break;
        case StringConfig.AutoLayout.Name:
          iconName = `ios-albums${focused ? '' : '-outline'}`;
          break;
        case StringConfig.Network.Name:
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          break;
        case StringConfig.AppIntro.Name:
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          break;
        case StringConfig.Map.Name:
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          break;
      }
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    }
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray'
  },
  tabBarPosition: 'bottom'
};

export { RouteConfig, Options };
