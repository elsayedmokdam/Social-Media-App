import { $API } from "../../api/axios";

export const getUnreadCount = async () => {
  const ROUTE = `notifications/unread-count`;

  const response = await $API.privateApi.get(`${ROUTE}`);
  return response;
};
