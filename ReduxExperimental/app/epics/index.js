import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { ActionTypes } from '../actions';

import API from '../api';

const onFetchOfferList = (action$, store) =>
  // action$
  //   .ofType(ActionTypes.FETCH_OFFER)
  //   .switchMap(action => API.getOfferList())
  //   .map(resp => ({
  //     type: ActionTypes.NAVIGATE_OFFER,
  //     data: resp.data.offers
  //   }));
  Observable.never();

const onFetchDetailOfffer = (action$, store) =>
  // action$
  //   .ofType(ActionTypes.FETCH_DETAIL_OFFER)
  //   .switchMap(action => API.getDetailOffer(action.id))
  //   .map(resp => ({
  //     type: ActionTypes.NAVIGATE_DETAIL_OFFER,
  //     data: resp.data
  //   }));
  Observable.never();

export default combineEpics(onFetchOfferList, onFetchDetailOfffer);
