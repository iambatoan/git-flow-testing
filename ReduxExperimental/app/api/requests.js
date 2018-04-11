import axios from 'axios';
import querystring from 'query-string';

import { ErrorCode } from '../constants';
import { Parser } from '../utils';

/*
HTTP response: {
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
}
*/

axios.defaults.baseURL = 'https://xtay-dev.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

const TIMEOUT_REQUEST = 5000;
const METHOD_REQUEST = {
  GET: 'get',
  POST: 'post'
};
const RequestOptions = { timeout: TIMEOUT_REQUEST };

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

function _handleErrorResponse(error) {
  let response = {
    code: ErrorCode.UNKNOW,
    errorMessage: error.message
  };
  if (error.response) {
    // The request was made and the server responded with a status code
    const { data, status, statusText, headers } = error.response;
    response = {
      data,
      code: status
    };
    const message = statusText || headers.status;
    if (message) {
      response.errorMessage = message;
    }
  } else if (error.request) {
    // The request was made but no response was received
    response.code = ErrorCode.TIMEOUT;
  }
  return Promise.reject(response);
}

async function request(
  apiPath,
  params = {},
  method = METHOD_REQUEST.GET,
  headers = {}
) {
  const options = {
    ...RequestOptions,
    method,
    url: axios.defaults.baseURL + apiPath
  };
  if (Object.keys(headers).length !== 0) {
    options.headers = headers;
  }
  if (method === METHOD_REQUEST.POST) {
    options.data = JSON.stringify(params);
  }
  console.log('request: ', options);
  try {
    const resp = await axios(options);
    console.log('resp: ', resp);
    // HTTP response
    const { status, statusText, headers } = resp;
    if (status !== ErrorCode.HTTP_SUCCESS) {
      return Promise.reject({
        code: status,
        errorMessage: statusText || headers.status
      });
    }
    // Server response
    const { data, code, message } = Parser.parseServerResponse(resp.data);
    if (code !== ErrorCode.SERVER_SUCCESS) {
      return Promise.reject({
        code,
        errorMessage: message
      });
    }
    return { data };
  } catch (error) {
    console.log('error: ', error);
    return _handleErrorResponse(error);
  }
}

function get(apiPath, params = {}, headers) {
  if (Object.keys(params).length !== 0) {
    apiPath += `?${querystring.stringify(params)}`;
  }
  return request(apiPath);
}

function post(apiPath, params = {}, headers) {
  return request(apiPath, params, METHOD_REQUEST.POST, headers);
}

function cancel() {
  source.cancel();
}

export { get, post, cancel };
