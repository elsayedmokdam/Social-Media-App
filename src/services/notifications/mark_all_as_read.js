import { $API } from "../../api/axios";

export const markAllAsRead = async () => {
  const ROUTE = `notifications/read-all`;

  const response = await $API.privateApi.patch(`${ROUTE}`, {});
  return response;
};
