import axios from 'axios';
import to from './await-to';
const API_ROOT = 'http://localhost:3000/api/v1/'; // root of the api url

const responseBody = (res) => res.data; // an arrow function to takes only the data value from the response object
const errBody = (res) => res.response.data;

// axios configuration object. this has header values with token.
const axiosConfig = (headers) => ({
  headers,
});

// request belongs to item api
const createAPI = (apiRoot) => {
  return {
    get: (url, headers = {}) =>
      to(axios.get(`${apiRoot}${url}`, axiosConfig(headers)).then(responseBody).catch(errBody)),
    post: (url, body, headers = {}) =>
      to(axios.post(`${apiRoot}${url}`, body, axiosConfig(headers)).then(responseBody).catch(errBody)),
    patch: (url, body, headers = {}) =>
      to(axios.patch(`${apiRoot}${url}`, body, axiosConfig(headers)).then(responseBody).catch(errBody)),
  };
};

const API = createAPI(API_ROOT);
export default API;
