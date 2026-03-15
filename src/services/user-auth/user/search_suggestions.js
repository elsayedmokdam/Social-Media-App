import { $API } from "../../../api/axios";

/**
 * @param {{ page?: number, limit?: number, q?: string }} [queryParams] - The queryParams is optional
 */
export const searchSuggestions = async (queryParams) => {
  const finalParams = {
    page: 1,
    limit: 10,
    ...queryParams,
  };
  const ROUTE = `users/suggestions`;

  const response = await $API.privateApi.get(`${ROUTE}`, {
    params: {
      ...finalParams,
    },
  });
  return response;
};
