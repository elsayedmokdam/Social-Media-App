import { $API } from "../../api/axios";

/**
 * @param {string} postId - The postId is required
 */
export const likeAndUnlikePost = async (postId) => {
  const ROUTE = `posts/${postId}/like`;

  const response = await $API.privateApi.put(`${ROUTE}`, {});
  return response;
};
