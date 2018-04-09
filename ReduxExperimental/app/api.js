import axios from 'axios';

import { ErrorCode } from './constants';

/*{
  // `data` is the response that was provided by the server
  data: {},
  // `status` is the HTTP status code from the server response
  status: 200,
  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',
  // `headers` the headers that the server responded with
  // All header names are lower cased
  headers: {},
  // `config` is the config that was provided to `axios` for the request
  config: {},
  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance the browser
  request: {}
}*/

axios.defaults.baseURL = 'https://rallycoding.herokuapp.com/api/';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

const TIMEOUT_REQUEST = 5000;

function _handleErrorResponse(error) {
  let response = {
    code: ErrorCode.UNKNOW,
    errorMessage: error.message
  };
  if (error.response) {
    // The request was made and the server responded with a status code
    const { data, status, statusText } = error.response;
    response = {
      data,
      code: status,
      errorMessage: statusText
    };
  } else if (error.request) {
    // The request was made but no response was received
    response.code = ErrorCode.TIMEOUT;
  }
  return Promise.reject(response);
}

async function request(apiPath = 'music_albums', params = {}, method = 'get') {
  const options = {
    method,
    url: axios.defaults.baseURL + apiPath,
    timeout: TIMEOUT_REQUEST
  };
  if (method === 'post') {
    options.data = JSON.stringify(params);
  }
  try {
    const resp = await axios(options);
    const { data, status, statusText } = resp;
    console.log('resp: ', data);
    if (status !== ErrorCode.SUCCESS) {
      return Promise.reject({
        code: status,
        errorMessage: statusText
      });
    }
    return { data };
  } catch (error) {
    return _handleErrorResponse(error);
  }
}

export default { request };
