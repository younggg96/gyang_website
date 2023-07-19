import { deleteReq, get, patch, post } from "./axios";

// moments
/**
 * @param {obj} object {content: string, img: string[]}
 * @returns
 */
export const createMoment = (body) => post("/moment", body);
/**
 * @param {number} curPage page
 * @returns current user's moment list
 */
export const getMomentList = (curPage) => get("/moment?page=" + curPage);

/**
 * @param {number} curPage page
 * @returns current user's moment list
 */
export const getMomentListAuth = (curPage) =>
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
