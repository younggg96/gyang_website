import { get, post } from "./axios";


/**
 * @param {number} userId user id
 * @param {number} curPage page number
 * @returns get article list by using user id
 */
export const getChildrenCommentsByPid = (curPage, row, pid) =>
  get(`/comment/parentCommentId/${pid}?page=${curPage}&row=${row}`);

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
