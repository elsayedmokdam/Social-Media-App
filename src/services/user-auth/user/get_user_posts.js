import { $API } from "../../../api/axios";

/**
 * @param {string} userId - The userId is required
 */
export const getUserPosts = async (userId) => {
  const ROUTE = `users/${userId}/posts`;

  const response = await $API.privateApi.get(`${ROUTE}`);
  return response;
};
