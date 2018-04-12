import { get, post, cancel } from './requests';

const PATH_REQUEST = {
  OAUTH_TOKEN: 'oauth/token',
  OAUTH_REVOKE: 'oauth/revoke',
  GET_USER: 'api/v1/users/me',
  GET_OFFER: 'api/v1/offers',
  GET_DETAIL_OFFER: (id) => `api/v1/offers/${id}`
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

const getOfferList = () =>
  get(PATH_REQUEST.GET_OFFER);

const getDetailOffer = id =>
  get(PATH_REQUEST.GET_DETAIL_OFFER(id));

export default { login, logout, getUserInfo, cancelRequest: cancel, getOfferList, getDetailOffer };
