import { combineReducers } from 'redux';

import Nav from './nav-reducer';
import Main from './main-reducer';

export default combineReducers({ Nav, Main });
