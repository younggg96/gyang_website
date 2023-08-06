import { get, post } from "./axios";

// user info
export const getConversation = (curPage) =>
  get(`/conversation?page=${curPage}`);
