import { $API } from "../../../api/axios";

/**
 * @param {string} postId - The postId is required
 * @param {{page?:number, limit?: number}} [queryParams] - The queryParams is optional
 */
export const getPostComments = async (postId, queryParams) => {
  const ROUTE = `posts/${postId}/comments`;
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
