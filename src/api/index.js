import { deleteReq, get, patch, post } from "./axios";

// articles
export const getArticleByArticleId = (id) => get("/article/user/" + id);
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

// moments
/**
 * @param {number} curPage page
 * @returns current user's moment list
 */
export const getMomentList = (curPage) => get("/moment?page=" + curPage);

/**
 * @param {number} curPage page
 * @returns current user's moment list
 */
export const getMomentListByUser = (curPage) =>
  get("/moment/user?page=" + curPage);

/**
 * @param {number} userId user id
 * @param {number} curPage page number
 * @returns get moment list by using user id
 */
export const getMomentListByUserId = (curPage, userId) =>
  get(`/moment/userId/${userId}?page=${curPage}`);

// moment like
/**
 * @param {momentId} momentId moment Id
 * @returns success
 */
export const addLikeMoment = (momentId) =>
  patch("/moment/momentlike/" + momentId);
/**
 * @param {momentId} momentId moment Id
 * @returns success
 */
export const removeLikeMoment = (momentId) =>
  deleteReq("/moment/momentlike/" + momentId);

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
