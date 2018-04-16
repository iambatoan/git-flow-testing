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
          offset: resp.data.pagination.next_page,
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

function loadMore(offset) {
  return dispatch => {
    dispatch({
      type: ActionTypes.FETCH_OFFER_LOADING,
      loading: true
    });
    API.getOfferList({ page: offset })
      .then(resp => {
        dispatch({
          type: ActionTypes.LOAD_MORE_OFFER,
          data: resp.data.offers,
          offset: resp.data.pagination.next_page
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

export default {
  getOffers,
  getDetailOffer,
  resetOffer,
  resetDetailOffer,
  loadMore
};
