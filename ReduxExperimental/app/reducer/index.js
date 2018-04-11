import { combineReducers } from 'redux';
import { PersistStoreConfig } from '../config';

import Nav from './nav-reducer';
import Main from './main-reducer';
import Auth from './auth-reducer';
import Login from './login-reducer';

export default combineReducers({
  nav: Nav,
  main: Main,
  [PersistStoreConfig.AUTH_KEY]: Auth,
  login: Login
});
