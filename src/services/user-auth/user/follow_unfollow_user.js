import { $API } from "../../../api/axios";

/**
 * @param {string} userId - The userId is required
 */
export const followUnfollowUser = async (userId) => {
  const ROUTE = `users/${userId}/follow`;

  const response = await $API.privateApi.put(`${ROUTE}`, {});
  return response;
};
