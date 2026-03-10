import { $API } from "../../../api/axios";

/**
 * @param {{ limit?: number }} [queryParams] - The queryParams is optional
 */
export const getFollowSuggestions = async (queryParams) => {
  const finalParams = {
    limit: 50,
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
