import { post } from "./axios";

// articles
/**
 *
 * @returns url
 */
export const uploadImg = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return post("/upload/image/", formData);
};

/**
 *
 * @returns url
 */
export const uploadImgs = (files) => {
  const formData = new FormData();
  for (const item of files) {
    formData.append("file", item.file);
  }
  return post("/upload/images/", formData);
};
