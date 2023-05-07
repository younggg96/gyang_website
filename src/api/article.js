import { deleteReq, get, patch, post } from "./axios";

/**
 * @param {object} data create article obj
 * {
    "title": "aaaasss",
    "content": "bbbbsss",
    "description": "baaaaaabbbsss",
    "img": "www.img.com",
    "categoryIds": [
        1, 2
    ]
 * }
 * @returns 
 */
export const createArticle = (data) => {
  console.log(data);
  post("/article", data);
};
/**
 * @param {articleId} articleId article Id
 * @returns success
 */
export const addLikeArticle = (momentId) => patch("/article/like/" + momentId);
/**
 * @param {articleId} articleId article Id
 * @returns success
 */
export const removeLikeArticle = (momentId) =>
  deleteReq("/article/like/" + momentId);

// category
/**
 * @returns all cates
 */
export const getCates = () => get("/category");
