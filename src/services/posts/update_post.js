import { $API } from "../../api/axios";

/**
 * @param {string} postId - The postId is required
 * @param {{
 *  newContent:string,
 *  imageFile?:File,
 *  removeImage?:boolean,
 *  privacy?:"public" | "following" | "only_me"
 * } | {
 *  newContent?:string,
 *  imageFile:File,
 *  removeImage?:boolean,
 *  privacy?:"public" | "following" | "only_me"
 *  } | {
 *  newContent?:string,
 *  imageFile?:File,
 *  removeImage:boolean,
 *  privacy?:"public" | "following" | "only_me"
 *  } | {
 *  newContent?:string,
 *  imageFile?:File,
 *  removeImage?:boolean,
 *  privacy:"public" | "following" | "only_me"
 *  }
 * } payload - The payload is required
 */
export const updatePost = async (postId, payload) => {
  const ROUTE = `posts/${postId}`;
  const formData = new FormData();
  payload.newContent && formData.append("body", payload.newContent);
  payload.imageFile && formData.append("image", payload.imageFile);
  payload.removeImage && formData.append("removeImage", payload.removeImage);
  payload.privacy && formData.append("privacy", payload.privacy);

  const response = await $API.privateApi.put(`${ROUTE}`, formData);
  return response;
};
