import { get } from "./axios";

/**
 * @param {number} userId user id
 * @param {number} curPage page number
 * @returns get article list by using user id
 */
export const getChildrenCommentsByPid = (curPage, row, pid) =>
  get(`/comment/parentCommentId/${pid}?page=${curPage}&row=${row}`);
