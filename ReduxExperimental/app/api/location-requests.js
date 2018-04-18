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

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

const TIMEOUT_REQUEST = 5000;
const METHOD_REQUEST = {
  GET: 'get',
  POST: 'post'
};
const RequestOptions = { timeout: TIMEOUT_REQUEST };

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
  headers = {},
  url
) {
  const options = {
    ...RequestOptions,
    method,
    url: 'https://maps.googleapis.com/maps/api' + apiPath
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
    const { results, error_message } = resp.data;
    if (resp.data.status !== 'OK') {
      return Promise.reject({
        code: ErrorCode.UNKNOW,
        errorMessage: error_message
      });
    }
    return { data: results };
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

export { get, request };
