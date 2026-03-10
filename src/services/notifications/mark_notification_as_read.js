import { $API } from "../../api/axios";

/**
 * @param {string} notificationId - The notificationId is required
 */
export const markNotificationAsRead = async (notificationId) => {
  const ROUTE = `notifications/${notificationId}/read`;

  const response = await $API.privateApi.patch(`${ROUTE}`, {});
  return response;
};
