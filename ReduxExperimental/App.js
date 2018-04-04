import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';

import RootReducer from './reducer';
import Main from './main';

export default class App extends Component {
  render() {
    const store = createStore(RootReducer);
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
