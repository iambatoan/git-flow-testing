import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './configureStore';

import AppWithNavigationState from './navigator';

export default class App extends Component {
  render() {
    const store = configureStore();
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
