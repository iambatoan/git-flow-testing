import { combineReducers } from 'redux';
import { PersistStoreConfig } from '../config';

import Nav from './nav';
import Main from './main';
import Auth from './auth';
import User from './user';

export default combineReducers({
  nav: Nav,
  main: Main,
  [PersistStoreConfig.AUTH_KEY]: Auth,
  user: User
});
