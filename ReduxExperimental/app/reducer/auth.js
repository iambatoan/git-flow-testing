import { persistReducer } from 'redux-persist';
import { PersistStoreConfig } from '../config';

import { ActionTypes } from '../actions';

const initialState = {
  accessToken: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        accessToken: action.accessToken
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        accessToken: ''
      };
  }
  return state;
};

const persistConfig = PersistStoreConfig.buildConfig({
  key: PersistStoreConfig.AUTH_KEY
});

export default persistReducer(persistConfig, reducer);
