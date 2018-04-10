import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import RootReducer from './reducer';

import { Navigator } from './components';
import { StringConfig, NavigatorConfig } from './config';

export default class App extends Component {
  render() {
    const devTools = global.reduxNativeDevTools
      ? global.reduxNativeDevTools()
      : noop => noop;
    const store = createStore(RootReducer, devTools);
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
