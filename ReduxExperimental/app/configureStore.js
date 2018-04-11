import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import RootReducer from './reducer';
import { PersistStoreConfig } from './config';
import { NavigatorMiddleware } from './navigator';

const PersistConfig = PersistStoreConfig.buildConfig({
  key: 'root',
  whitelist: [PersistStoreConfig.AUTH_KEY]
});

export default () => {
  const middlewares = applyMiddleware(NavigatorMiddleware, thunk);
  const devTools = global.reduxNativeDevTools
    ? global.reduxNativeDevTools()
    : noop => noop;

  const _persistReducer = persistReducer(PersistConfig, RootReducer);
  const enhancer = compose(middlewares, devTools);

  const store = createStore(_persistReducer, enhancer);

  persistStore(store);

  return store;
};
