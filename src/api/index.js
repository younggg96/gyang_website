import { get, post } from "./axios";

/**
 * @param {number} curPage page
 * @returns current user's article list
 */
export const getArticleList = (curPage) => get("/article?page=" + curPage);

/**
 * @param {number} userId user id
 * @param {number} curPage page number
 * @returns get article list by using user id
 */
export const getArticleListByUserId = (curPage, userId) =>
  get(`/article/userId/${userId}?page=${curPage}`);

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
