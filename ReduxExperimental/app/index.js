import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import RootReducer from './reducer';

import { Navigator } from './components';
import { StringConfig, NavigatorConfig } from './config';

export default class App extends Component {
  render() {
    const store = createStore(RootReducer);
    return (
      <Provider store={store}>
        <Navigator
          screenConfig={NavigatorConfig.RouteConfig}
          initialRouteName={StringConfig.HOME_TITLE}
        />
      </Provider>
    );
  }
}
