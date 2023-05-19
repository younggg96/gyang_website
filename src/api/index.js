import { get, post } from "./axios";
/**
 * @param {object} data form info object
 * @returns axios http request promise
 */
export const postCheck = (data) => post("/auth/check", data);

/**
 * @param {object} data form info object
 * @returns axios http request promise
 */
export const postReset = (data, email) => {
  return post("/auth/resetPwd", { ...data, email });
};

/**
 * @param {object} data form info object
 * @returns axios http request promise
 */
export const postSignin = (data) => post("/auth/login", data);

/**
 * POST method
 * @param {string} url request url
 * @param {object} data form info object
 * @returns axios http request promise
 */
export const postRequest = (url, data) => post(url, data);

// user info
export const getTopUserList = (curPage) =>
  get(`/auth/getTopUserList?page=${curPage}&row=5`);

export const getUserInfo = (id) => get("/auth/getUserInfo/" + id);

export const identifyUser = () => post("/auth/identify");

// user profile
export const getUserProfile = (email) => get("/profile?email=" + email);
