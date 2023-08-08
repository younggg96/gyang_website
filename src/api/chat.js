import { get, post } from "./axios";

export const getConversation = (curPage) =>
  get(`/conversation?page=${curPage}`);

export const getMessages = (conversationId) =>
  get(`/message/${conversationId}`);
