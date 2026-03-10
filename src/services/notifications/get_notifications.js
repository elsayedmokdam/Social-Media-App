import { $API } from "../../api/axios";

/**
 * @param {{
 *  unread: boolean,
 *  page?: number,
 *  limit?: number
 * } | {
 *  unread?: boolean,
 *  page: number
 *  limit?: number
 * } | {
 *  unread?: boolean,
 *  page?: number
 *  limit: number}} [queryParams] - The queryParams is optional
 */

export const getNotifications = async (queryParams) => {
  const ROUTE = `notifications`;
  const finalParams = {
    page: 1,
    limit: 10,
    ...queryParams,
  };
  const response = await $API.privateApi.get(`${ROUTE}`, {
    params: {
      ...finalParams,
    },
  });

  return response;
};
