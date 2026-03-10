import { $API } from "../../../api/axios";

/**
 * @param {{ q?: string }} [queryParams] - The queryParams is optional
 */
export const searchSuggestions = async (queryParams) => {
  const finalParams = {
    limit: 20,
    ...queryParams,
  };
  const ROUTE = `users/search`;

  const response = await $API.privateApi.get(`${ROUTE}`, {
    params: {
      ...finalParams,
    },
  });
  return response;
};
