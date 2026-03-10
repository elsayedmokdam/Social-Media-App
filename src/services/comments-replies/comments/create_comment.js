import { $API } from "../../../api/axios";
/**
 * @param {string} postId - The postId is required
 * @param {{
 *  content: string,
 *  imageFile?: File
 * } | {
 *  content?:string,
 *  imageFile:File}} payload - The payload is required
 */
export const createComment = async (postId, payload) => {
  const ROUTE = `posts/${postId}/comments`;
  const formData = new FormData();
  payload.content && formData.append("content", payload.content);
  payload.imageFile && formData.append("image", payload.imageFile);

  const response = await $API.privateApi.post(`${ROUTE}`, formData);
  return response;
};
