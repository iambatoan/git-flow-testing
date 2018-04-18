import { get, post, cancel, } from './requests';
import { get as LocaltionGet } from './location-requests';

const PATH_REQUEST = {
  OAUTH_TOKEN: 'oauth/token',
  OAUTH_REVOKE: 'oauth/revoke',
  GET_USER: 'api/v1/users/me',
  GET_OFFER: 'api/v1/offers',
  GET_DETAIL_OFFER: id => `api/v1/offers/${id}`
};

const _buildContentType = type => ({ 'content-type': type });

const login = (params = {}) =>
  post(
    PATH_REQUEST.OAUTH_TOKEN,
    { grant_type: 'password', ...params },
    { ..._buildContentType('application/json') }
  );

const logout = access_token =>
  post(PATH_REQUEST.OAUTH_REVOKE, { access_token });

const getUserInfo = access_token =>
  get(PATH_REQUEST.GET_USER, { access_token });

const getOfferList = params => get(PATH_REQUEST.GET_OFFER, params);

const getDetailOffer = id => get(PATH_REQUEST.GET_DETAIL_OFFER(id));

// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&key=YOUR_API_KEY
const PlaceType = {
  Restaurant: 'restaurant'
};

const getLocations = (region, placeType) => {
  const params = {
    location: `${region.latitude},${region.longitude}`,
    radius: 1500,
    type: placeType,
    key: 'AIzaSyAB4OmMiY7XjGLhUlc6aOIdnWg5aea5CBo'
  };
  return LocaltionGet('/place/nearbysearch/json', params);
};

export default {
  login,
  logout,
  getUserInfo,
  cancelRequest: cancel,
  getOfferList,
  getDetailOffer,
  getLocations,
  PlaceType
};
