import { deleteReq, patch } from "./axios"

/**
 * @param {articleId} articleId article Id
 * @returns success
 */
export const addLikeArticle = (momentId) =>
  patch("/article/like/" + momentId);
/**
 * @param {articleId} articleId article Id
 * @returns success
 */
export const removeLikeArticle = (momentId) =>
  deleteReq("/article/like/" + momentId);
