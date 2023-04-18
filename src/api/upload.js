import { post } from "./axios";

// articles
/**
 *
 * @returns url
 */
export const uploadImg = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  post("/upload/image/", formData);
};

/**
 *
 * @returns url
 */
export const uploadImgs = (files) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append("file", file);
  }

  post("/upload/images/", formData);
};
