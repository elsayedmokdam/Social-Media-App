import { $API } from "../../../api/axios";

/**
 * @param {string} postId - The postId is required
 * @param {string} commentId - The commentId is required
 * @param {{
 *    content: string,
 *    imageFile?: File
 *  } | {
 *    content?: string,
 *    imageFile: File
 * }} payload - The payload is required
 */

export const createReply = async (postId, commentId, payload) => {
  const ROUTE = `posts/${postId}/comments/${commentId}/replies`;
  const formData = new FormData();
  payload.content && formData.append("content", payload.content);
  payload.imageFile && formData.append("image", payload.imageFile);

  const response = await $API.privateApi.post(`${ROUTE}`, formData);
  return response;
};
