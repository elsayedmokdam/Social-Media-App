import { $API } from "../../api/axios";

/**
 * @param {string} postId - The postId is required
 */
export const bookmarkAndUnbookmarkPost = async (postId) => {
  const ROUTE = `posts/${postId}/bookmark`;

  const response = await $API.privateApi.put(`${ROUTE}`, {});
  return response;
};
