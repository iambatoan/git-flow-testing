import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import { StackNavigator } from 'react-navigation';

import RootReducer from './reducer';
import MainView from './view/main';
import ReduxView from './view/redux-view';

export default class App extends Component {
  render() {
    const store = createStore(RootReducer);
    const RootStack = StackNavigator(
      {
        MainView: {
          screen: MainView
        },
        ReduxView: {
          screen: ReduxView
        }
      },
      {
        initialRouteName: 'MainView'
      }
    );
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}
