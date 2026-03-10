import { $API } from "../../../api/axios";
/**
 * @param {string} userId - The userId is required
 */
export const getUserProfile = async (userId) => {
  const ROUTE = `users/${userId}/profile`;

  const response = await $API.privateApi.get(`${ROUTE}`);
  return response;
};
