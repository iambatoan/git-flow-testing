import ActionTypes from './action-types';
import API from '../api';

function getOffers() {
  return dispatch => {
    dispatch({
      type: ActionTypes.FETCH_OFFER_LOADING,
      loading: true
    });
    API.getOfferList()
      .then(resp => {
        dispatch({
          type: ActionTypes.FETCH_OFFER,
          offers: resp.data.offers
        });
      })
      .catch(error => {
        dispatch({
          type: ActionTypes.FETCH_OFFER_ERROR,
          error: error.errorMessage
        });
      });
  };
}

function getDetailOffer(id) {
  return dispatch => {
    dispatch({
      type: ActionTypes.FETCH_DETAIL_OFFER_LOADING,
      loading: true
    });
    API.getDetailOffer(id)
      .then(resp => {
        dispatch({
          type: ActionTypes.FETCH_DETAIL_OFFER,
          data: resp.data
        });
      })
      .catch(error => {
        dispatch({
          type: ActionTypes.FETCH_DETAIL_OFFER_ERROR,
          error: error.errorMessage
        });
      });
  };
}

function resetOffer() {
  return dispatch => {
    dispatch({ type: ActionTypes.RESET_OFFER });
  };
}

function resetDetailOffer() {
  return dispatch => {
    dispatch({ type: ActionTypes.RESET_DETAIL_OFFER });
  };
}

export default { getOffers, getDetailOffer, resetOffer, resetDetailOffer };
