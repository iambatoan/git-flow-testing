import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

const RouteConfig = {};

const Options = {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-information-circle${focused ? '' : '-outline'}`;
      } else if (routeName === 'Settings') {
        iconName = `ios-options${focused ? '' : '-outline'}`;
      }
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    }
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray'
  },
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false
};

export { RouteConfig, Options };
