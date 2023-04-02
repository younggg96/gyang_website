import { deleteReq, get, patch, post } from "./axios";

/**
 * @param {commentId} commentId comment Id
 * @returns success
 */
export const addLikeComment = (commentId) =>
  patch("/comment/like/" + commentId);
/**
 * @param {commentId} commentId comment Id
 * @returns success
 */
export const removeLikeComment = (commentId) =>
  deleteReq("/comment/like/" + commentId);

/**
 * @param {number} userId user id
 * @param {number} curPage page number
 * @returns get article list by using user id
 */
export const getChildrenCommentsByPid = (curPage, row, pid) =>
  get(`/comment/parentCommentId/${pid}?page=${curPage}&row=${row}`);

/**
 * @param {number} userId user id
 * @param {number} curPage page number
 * @param {number} aid article id
 * @returns get comments list by using article id
 */
export const getCommentsByArticleId = (curPage, row, aid) =>
  get(`/comment/getCommentsByArticleId/${aid}?page=${curPage}&row=${row}`);

/**
 *
 * @param {object} data
 *  articleId: number;
    content: string;
    parentId?: number;
    replyTo?: number;
 * @returns
 */
export const createComment = (data) => post("/comment/createComment", data);

/**
 *
 * @param {object} data
 *  articleId: number;
    content: string;
    parentId?: number;
    replyTo?: number;
 * @returns
 */
export const createReply = (data) => post("/comment/createReply", data);
