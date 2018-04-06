import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';

import RootReducer from './reducer';

import { Navigator } from './components';

import MainView from './view/main';
import ReduxView from './view/redux-view';
import AutoLayoutView from './view/autolayout-view';

export default class App extends Component {
  render() {
    const store = createStore(RootReducer);
    const screenConfig = [
      {
        screen: MainView,
        screenName: 'MainView'
      },
      {
        screen: ReduxView,
        screenName: 'ReduxView'
      },
      {
        screen: AutoLayoutView,
        screenName: 'AutoLayoutView'
        // hideNavBar: true
      }
    ];
    return (
      <Provider store={store}>
        <Navigator screenConfig={screenConfig} initialRouteName="MainView" />
      </Provider>
    );
  }
}
