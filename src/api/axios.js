import axios from "axios";
import { BASE_SERVER_URL } from ".";

axios.defaults.timeout = 100000;
axios.defaults.baseURL = `${BASE_SERVER_URL}/api`;

//失败提示
const msag = (err) => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = "Bad Request(400)";
        break;
      case 401:
        err.message = "Unauthorized(401)";
        break;
      case 403:
        err.message = "Forbidden resource(403)";
        break;
      case 404:
        err.message = "Not Found(404)";
        break;
      case 408:
        err.message = "Request Timeout(408)";
        break;
      case 500:
        err.message = "Internal Server Error(500)";
        break;
      case 501:
        err.message = "服务未实现(501)";
        break;
      case 502:
        err.message = "Bad Gateway(502)";
        break;
      case 503:
        err.message = "Service Unavailable(503)";
        break;
      case 504:
        err.message = "Gateway Timeout(504)";
        break;
      default:
        err.message = `Network error(${err.response.status})!`;
    }
  }
};

/**
 * 查看返回的数据
 * @param url
 * @param params
 * @param data
 */
function landing(url, params, data) {
  if (data.code === -1) {
  }
}

export const errorhandler = () => {};

/**
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((response) => {
        landing(url, params, response.data);
        resolve(response.data);
      })
      .catch((err) => {
        msag(err);
        reject(err);
      });
  });
}

/**
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
  return axios({
    method: "post",
    url,
    data,
  }).then((res) => res.data);
}

/**
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

/**
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

/**
 * @param url
 * @param data
 * @returns {Promise}
 */

export function deleteReq(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}
