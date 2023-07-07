import { deleteReq, get, patch, post } from "./axios";

/**
 * @param {momentId} moment id
 * @returns success
 */
export const addLikeMomentComment = (momentId) =>
  patch("/moment-comment/momentLike/" + momentId);
/**
 * @param {momentId} moment id
 * @returns success
 */
export const removeLikeMomentComment = (momentId) =>
  deleteReq("/moment-comment/momentLike/" + momentId);

/**
 * @param {number} row amount items
 * @param {number} pid moment parent id
 * @param {number} curPage page number
 * @returns get moment comment list
 */
export const getChildrenMomentCommentsByPid = (curPage, row, pid) =>
  get(
    `/moment-comment/parentMomentCommentId/${pid}?page=${curPage}&row=${row}`
  );

/**
 * @param {number} row amount items
 * @param {number} curPage page number
 * @param {number} mid moment id
 * @returns get moment comments list by using moment id
 */
export const getMomentCommentsByMomentId = (curPage, row, mid) =>
  get(
    `/moment-comment/getMomentCommentsByMomentId/${mid}?page=${curPage}&row=${row}`
  );

/**
 *
 * @param {object} data
 *  momentId: number;
    content: string;
    parentId?: number;
    replyTo?: number;
 * @returns
 */
export const createMomentComment = (data) =>
  post("/moment-comment/createComment", data);

/**
 *
 * @param {object} data
 *  momentID: number;
    content: string;
    parentId?: number;
    replyTo?: number;
 * @returns
 */
export const createMomentCommentReply = (data) =>
  post("/moment-comment/createReply", data);
