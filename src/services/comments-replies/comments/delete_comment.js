import { $API } from "../../../api/axios";
/**
 * @param {string} postId - The postId is required
 * @param {string} commentId - The commentId is required
 */
export const deleteComment = async (postId, commentId) => {
  const ROUTE = `posts/${postId}/comments/${commentId}`;

  const response = await $API.privateApi.delete(`${ROUTE}`);
  return response;
};
