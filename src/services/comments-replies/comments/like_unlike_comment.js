import { $API } from "../../../api/axios";

/**
 * @param {string} postId - The postId is required
 * @param {string} commentId - The commentId is required
 */
export const likeAndUnlikeComment = async (postId, commentId) => {
  const ROUTE = `posts/${postId}/comments/${commentId}/like`;

  const response = await $API.privateApi.put(`${ROUTE}`, {});
  return response;
};
