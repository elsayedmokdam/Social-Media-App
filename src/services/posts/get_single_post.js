import { $API } from "../../api/axios";

/**
 * @param {string} postId - The postId is required
 */
export const getSinglePost = async (postId) => {
  const ROUTE = `posts/${postId}`;

  const response = await $API.privateApi.get(`${ROUTE}`);
  return response;
};
