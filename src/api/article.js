import { deleteReq, get, patch, post } from "./axios";

// articles
/**
 *
 * @param {number} id article Id
 * @returns article
 */
export const getArticleByArticleId = (id) => get("/article/" + id);
/**
 *
 * @param {number} id article Id
 * @returns article
 */
export const getArticleByArticleIdAuth = (id) => get("/article/user/" + id);
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
 * @returns new article
 */
export const createArticle = (data) => post("/article", data);
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
