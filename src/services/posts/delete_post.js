import { $API } from "../../api/axios";

/**
 * @param {string} postId - The postId is required
 */
export const deletePost = async (postId) => {
  const ROUTE = `posts/${postId}`;

  const response = await $API.privateApi.delete(`${ROUTE}`);
  return response;
};
