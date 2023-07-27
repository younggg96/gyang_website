import { get, post } from "./axios";
/**
 * @param {object} data form info object
 * @returns axios http request promise
 */
export const postCheck = (data) => post("/auth/check", data);

/**
 * @param {object} data form info object
 * @returns axios http request promise
 */
export const postReset = (data, email) => {
  return post("/auth/resetPwd", { ...data, email });
};

/**
 * @param {object} data form info object
 * @returns axios http request promise
 */
export const postSignin = (data) => post("/auth/login", data);
