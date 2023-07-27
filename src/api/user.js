import { get, post } from "./axios";

// user info
export const getTopUserList = (curPage) =>
  get(`/auth/getTopUserList?page=${curPage}&row=5`);

export const getUserInfo = (id) => get("/auth/getUserInfo/" + id);

export const identifyUser = () => post("/auth/identify");

// user profile
export const getUserProfile = (email) => get("/profile?email=" + email);
