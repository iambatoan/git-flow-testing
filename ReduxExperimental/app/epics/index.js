import { combineEpics } from 'redux-observable';
import { NavigationActions } from 'react-navigation';
import { Observable } from 'rxjs';
import { ActionTypes } from '../actions';

import API from '../api';
import { StringConfig } from '../config';

const onFetchOfferList = (action$, store) =>
  action$
    .ofType(ActionTypes.FETCH_OFFER)
    .switchMap(action => API.getOfferList())
    .mergeMap(resp => {
      store.dispatch(
        NavigationActions.navigate({
          routeName: StringConfig.OfferList.Name,
          params: { datas: resp.data.offers }
        })
      );
      return Observable.never();
    });

const onFetchDetailOfffer = (action$, store) =>
  action$
    .ofType(ActionTypes.FETCH_DETAIL_OFFER)
    .switchMap(action => API.getDetailOffer(action.id))
    .mergeMap(resp => {
      store.dispatch(
        NavigationActions.navigate({
          routeName: StringConfig.DetailOffer.Name,
          params: { data: resp.data }
        })
      );
      return Observable.never();
    });

export default combineEpics(onFetchOfferList, onFetchDetailOfffer);
