import { createStore, applyMiddleware, compose } from 'redux';

import RootReducer from './reducer';
import { NavigatorMiddleware } from './navigator';

export default () => {
  const middlewares = applyMiddleware(NavigatorMiddleware);
  const devTools = global.reduxNativeDevTools
    ? global.reduxNativeDevTools()
    : noop => noop;

  const enhancer = compose(middlewares, devTools);

  const store = createStore(RootReducer, enhancer);

  return store;
};
