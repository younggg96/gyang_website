/**
 * 网络请求配置
 */
import axios from "axios";

axios.defaults.timeout = 100000;
axios.defaults.baseURL = "http://localhost:3000/api";

// /**
//  * http request 拦截器
//  */
// axios.interceptors.request.use(
//   (config) => {
//     config.data = JSON.stringify(config.data);
//     config.headers = {
//       "Content-Type": "application/json",
//     };
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// /**
//  * http response 拦截器
//  */
// axios.interceptors.response.use(
//   (response) => {
//     if (response.data.errCode === 2) {
//       console.log("Timeout.");
//     }
//     return response;
//   },
//   (error) => {
//     console.log("Request: ", error.message);
//   }
// );

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
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
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
  return axios({
    method: "post",
    url,
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((res) => res.data);
}

/**
 * 封装patch请求
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
 * 封装put请求
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

//失败提示
function msag(err) {
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
}

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
